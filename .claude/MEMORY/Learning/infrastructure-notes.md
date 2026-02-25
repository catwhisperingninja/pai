# Infrastructure Notes

**Recorded:** 2026-02-14

## Environment

- PAI runs on a VM (required by Claude Code install situation)
- Cannot easily co-exist with other Claude Code installs
- Docker Desktop access from this VM is difficult
- Other agents (tax, legal, etc.) run on the main machine with easy Docker access

## Connectivity Model

- PAI connects to agent hub at http://192.168.60.43:3100/mcp
- Fallback: Tailscale IPs are unreliable due to Docker Desktop quarantine issues
- LAN IP 192.168.60.43 works via Tailscale direct path (see `tailscale status` for current direct addr)
- Other agents (tax, legal) need to be given agent hub connection info to participate
- PAI acts as central orchestrator; other agents push/pull via hub API

## Hub Connection — SOLVED (2026-02-18 15:30 PST)

### THE FIX (copy-paste — 2 commands, <5 seconds)

```bash
# Step 1: Get the LAN IP from Tailscale's direct connection to Docker Desktop
/Applications/Tailscale.app/Contents/MacOS/Tailscale status | grep docker-desktop

# Look for: "active; direct X.X.X.X:PORT" — the X.X.X.X is your LAN IP
# Example output:
# 100.84.253.2  osx-hostname-docker-desktop  ...  active; direct 192.168.60.43:58099

# Step 2: Curl the hub on that LAN IP (NOT the 100.x Tailscale IP)
curl -s --connect-timeout 5 http://192.168.60.43:3100/health
# Should return: {"status":"ok","server":"pai-agenthub-mcp","version":"2.1.0"}
```

**Current working IP: `192.168.60.43:3100`** (as of 2026-02-18)
**settings.json mcpServers.agent-hub.url already updated to this IP.**

### WHY THIS WORKS

Tailscale virtual IPs (100.x.x.x) don't route TCP to Docker container ports.
Docker Desktop binds to localhost only, and the Tailscale Docker Desktop extension
handles ICMP (ping works) but NOT TCP port forwarding to containers.

**The trick:** `tailscale status` shows `direct X.X.X.X:PORT` — this is the actual
LAN IP of the peer. Since both machines are on the same physical network, this LAN IP
bypasses the Tailscale overlay entirely and hits Docker Desktop's actual network interface,
where port 3100 IS exposed.

### IF THE LAN IP CHANGES

The LAN IP can change if Docker Desktop restarts or gets a new DHCP lease.
Re-run Step 1 above to get the current one. Update settings.json:
`mcpServers.agent-hub.url` → `http://NEW_IP:3100/mcp`

### CURL-BASED MCP (no restart needed)

Even without MCP tools connected at session start, the hub speaks JSON-RPC over HTTP:
```bash
# Initialize session
curl -s -X POST http://192.168.60.43:3100/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"pai-cli","version":"1.0"}}}'

# Call any tool (e.g., check inbox)
curl -s -X POST http://192.168.60.43:3100/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"hub_check_inbox","arguments":{"agent_id":"pai"}}}'
```

### NETWORK TOPOLOGY

- Hub host: osx-hostname (Tailscale 100.114.74.120, LAN varies) — macOS
- Docker Desktop Tailscale: osx-hostname-docker-desktop (Tailscale 100.84.253.2, LAN 192.168.60.43) — linux
- PAI VM: dev (Tailscale 100.86.15.93) — this machine
- Tailscale CLI: now available on host (`brew install tailscale` done 2026-02-18)

### HISTORY

This issue burned 15+ min of context across 4+ session restarts on 2026-02-18.
Root cause: Tailscale virtual IPs don't forward TCP to Docker containers.
Solution: use the LAN IP from `tailscale status` direct connection field.

## Package Management

- **Python:** Poetry (not pip, not uv)

## Project Repos (on main machine, ~/Documents/github-projects/)

- `pai` — this repo, Personal AI hub (VM)
- `forensics-processor` — CSV processing, financial analysis
- `pydantic-trader` / `defi-trader-demo` — trading/investment
- Tax agent — location TBD (standard Claude Code instance, separate from VM)
- Legal agent — location TBD
- Content/Substack pipeline — location TBD

## Integration Pattern

PAI (VM) <--MCP/HTTP--> Agent Hub (LAN: 192.168.60.43:3100) <--API--> Other agents (main machine)

Other agents don't need MCP — they just need HTTP access to the hub API endpoints.
