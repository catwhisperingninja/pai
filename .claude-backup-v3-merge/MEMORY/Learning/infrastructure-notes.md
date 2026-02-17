# Infrastructure Notes

**Recorded:** 2026-02-14

## Environment

- PAI runs on a VM (required by Claude Code install situation)
- Cannot easily co-exist with other Claude Code installs
- Docker Desktop access from this VM is difficult
- Other agents (tax, legal, etc.) run on the main machine with easy Docker access

## Connectivity Model

- PAI connects to agent hub at http://100.114.74.120:3100/mcp
- Other agents (tax, legal) need to be given agent hub connection info to participate
- PAI acts as central orchestrator; other agents push/pull via hub API

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

PAI (VM) <--MCP--> Agent Hub (100.114.74.120:3100) <--API--> Other agents (main machine)

Other agents don't need MCP — they just need HTTP access to the hub API endpoints.
