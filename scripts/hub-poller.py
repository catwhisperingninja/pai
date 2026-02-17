#!/usr/bin/env python3
"""
Adaptive Hub Inbox Poller for Pi

Polling strategy:
  - ACTIVE mode: check every 10 minutes
  - IDLE mode: check every 4 hours (after 2 consecutive empty checks)
  - Switches back to ACTIVE on any new message

Logs to stdout and optionally to a file.
"""

import json
import signal
import sys
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

HUB_URL = "http://100.114.74.120:3100/mcp"
AGENT_NAME = "pi"
ACTIVE_INTERVAL = 600       # 10 minutes
IDLE_INTERVAL = 14400       # 4 hours
EMPTY_CHECKS_TO_IDLE = 2    # consecutive empty checks before switching to idle

LOG_DIR = Path(__file__).parent.parent / "logs"
LOG_FILE = LOG_DIR / "hub-poller.log"

running = True


def hub_call(tool_name: str, arguments: dict) -> dict:
    """Make a JSON-RPC call to the agent hub."""
    payload = json.dumps({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
            "name": tool_name,
            "arguments": arguments
        }
    }).encode()

    req = urllib.request.Request(
        HUB_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream"
        }
    )

    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())


def check_inbox() -> dict:
    """Check Pi's inbox and return parsed response."""
    result = hub_call("hub_check_inbox", {"agent_name": AGENT_NAME})
    return json.loads(result["result"]["content"][0]["text"])


def mark_read(message_id: str):
    """Mark a message as read."""
    hub_call("hub_mark_read", {"message_id": message_id})


def log(msg: str):
    """Log to stdout and file."""
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    try:
        LOG_DIR.mkdir(parents=True, exist_ok=True)
        with open(LOG_FILE, "a") as f:
            f.write(line + "\n")
    except OSError:
        pass


def handle_signal(signum, frame):
    global running
    log(f"Received signal {signum}, shutting down...")
    running = False


def main():
    signal.signal(signal.SIGINT, handle_signal)
    signal.signal(signal.SIGTERM, handle_signal)

    consecutive_empty = 0
    mode = "active"
    interval = ACTIVE_INTERVAL

    log(f"Hub poller started for agent '{AGENT_NAME}'")
    log(f"Hub: {HUB_URL}")
    log(f"Active interval: {ACTIVE_INTERVAL}s | Idle interval: {IDLE_INTERVAL}s")
    log(f"Empty checks to idle: {EMPTY_CHECKS_TO_IDLE}")

    while running:
        try:
            inbox = check_inbox()
            unread = inbox.get("unread_count", 0)
            messages = inbox.get("messages", [])

            # Filter to actually unread
            new_msgs = [m for m in messages if not m.get("read")]

            if new_msgs:
                consecutive_empty = 0
                if mode != "active":
                    mode = "active"
                    interval = ACTIVE_INTERVAL
                    log(f"MODE: ACTIVE (new messages detected)")

                log(f"Inbox: {len(new_msgs)} unread message(s)")
                for msg in new_msgs:
                    sender = msg.get("from_agent", "unknown")
                    subject = msg.get("subject", "(no subject)")
                    urgency = msg.get("urgency", "info")
                    log(f"  [{urgency.upper()}] {sender}: {subject}")
            else:
                consecutive_empty += 1
                log(f"Inbox: empty (streak: {consecutive_empty}/{EMPTY_CHECKS_TO_IDLE})")

                if consecutive_empty >= EMPTY_CHECKS_TO_IDLE and mode != "idle":
                    mode = "idle"
                    interval = IDLE_INTERVAL
                    log(f"MODE: IDLE (switching to {IDLE_INTERVAL // 3600}h interval)")

        except Exception as e:
            log(f"ERROR: {e}")
            # On error, don't change mode, just wait and retry

        # Sleep in small increments so we can respond to signals
        elapsed = 0
        while running and elapsed < interval:
            time.sleep(min(10, interval - elapsed))
            elapsed += 10

    log("Hub poller stopped.")


if __name__ == "__main__":
    main()
