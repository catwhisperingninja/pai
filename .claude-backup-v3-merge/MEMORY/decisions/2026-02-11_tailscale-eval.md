---
date: 2026-02-11
updated: 2026-02-14
status: in-progress
topic: Tailscale for VM-to-Docker connectivity
---

# Tailscale for Agent Hub Connectivity

## Context
- Agent Hub MCP server running in Docker container on host system (port 3100)
- Claude Code (PAI) running in VM
- Tax/legal agents on host handle SSN and sensitive financial data
- Direct port access (host:3100) works but is plaintext HTTP over LAN

## Decision (2026-02-14): PROCEED
Tailscale required now that tax data with SSN will flow through the agent hub.

## Architecture
```
Host (tax/legal/content agents) --Tailscale--> Agent Hub (Docker, port 3100) <--Tailscale-- PAI VM
```

## Steps
1. [DONE] Link VM and host in Tailscale dashboard
2. [DONE] Verify connectivity: VM reaches host at 100.114.74.120:3100
3. [DONE] Update PAI MCP config to use Tailscale address
4. [ ] Update connection info for tax agent to use Tailscale address
5. [DONE] Test hub_check_inbox via Tailscale endpoint — working
6. [ ] Consider Tailscale ACLs to restrict port 3100 access

## Tailscale IPs
- Host (agent hub, Docker Desktop): 100.114.74.120
- VM (PAI): 100.86.15.93

## Previous Decision (2026-02-11)
Deferred — no sensitive data flowing yet, direct port access sufficient.
