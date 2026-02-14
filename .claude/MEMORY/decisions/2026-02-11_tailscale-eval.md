---
date: 2026-02-11
status: deferred
topic: Tailscale for VM-to-Docker connectivity
---

# Evaluate Tailscale for Agent Hub Connectivity

## Context
- Agent Hub MCP server running in Docker container on host system (port 3100)
- Claude Code running in VM
- Tailscale installed on both VM and Docker
- Direct port access (host:3100) works currently

## Consideration
Tailscale could provide stable addressing between VM and Docker containers, but may add complexity with agent spawning and MCP connections.

## Decision
Hold off — evaluate later once agent patterns are established. Current direct port access is sufficient.
