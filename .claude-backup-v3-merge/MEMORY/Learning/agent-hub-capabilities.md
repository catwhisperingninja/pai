# Agent Hub MCP Server

**Location:** http://100.114.74.120:3100/mcp
**Type:** Streamable HTTP MCP server
**Configured in:** ~/.claude/settings.json under `mcpServers.agent-hub`
**Recorded:** 2026-02-14

## Purpose

Central orchestration hub for multi-agent communication, task routing, shared state, and scheduled reminders. All agents (Pi, tax-agent, legal-assistant, etc.) connect through this hub.

## Tools (22 total)

### Alerts & Priority Queue
| Tool | Description |
|------|-------------|
| `hub_list_alerts` | List/filter reports from all agents. Filters: status, agent, type, priority, urgency, time range, text search |
| `hub_priority_queue` | Top pending items ranked by urgency > priority > age. "What needs attention now?" |
| `hub_get_alert` | Full details for a single alert by UUID |
| `hub_agent_summary` | Dashboard: per-agent counts of pending/acknowledged/resolved |
| `hub_acknowledge_alert` | Mark alert as seen/will handle |
| `hub_resolve_alert` | Mark alert as handled |
| `hub_dismiss_alert` | Dismiss noise/duplicates |
| `hub_submit_report` | Submit alert/report. Supports urgency levels and structured delegation context |

### Agent Capability Registry
| Tool | Description |
|------|-------------|
| `hub_register_capability` | Register agent's skills, description, accepted task types. Upserts safely |
| `hub_list_capabilities` | List all registered agents and what they can do |
| `hub_find_agents_by_skill` | Find agents with a specific skill for task routing |

### Shared Context (Cross-Agent State)
| Tool | Description |
|------|-------------|
| `hub_set_context` | Store key-value state. Namespaced (global or per-project) |
| `hub_get_context` | Retrieve a context value |
| `hub_list_context` | List all context entries in a namespace |
| `hub_delete_context` | Remove stale context |

### Messaging (Async Agent-to-Agent)
| Tool | Description |
|------|-------------|
| `hub_send_message` | Send message to agent's inbox. Persists until read. Supports delegation context |
| `hub_check_inbox` | Check unread messages, sorted by urgency |
| `hub_mark_read` | Mark single message as read |
| `hub_mark_all_read` | Mark all unread messages as read |

### Reminders (Scheduled + Recurring)
| Tool | Description |
|------|-------------|
| `hub_create_reminder` | Schedule reminder at specific time. Creates hub alert AND Slack notification. Supports one-shot and recurring (`30m`, `4h`, `1d`, `2w`, `1M`) |
| `hub_list_reminders` | List reminders, filter by agent/status |
| `hub_get_reminder` | Full reminder details by UUID |
| `hub_cancel_reminder` | Cancel active reminder |

### Activity Feed
| Tool | Description |
|------|-------------|
| `hub_activity_feed` | "What happened since I was last active?" All reports since a timestamp. Use at session start |

## Key Patterns

- **Session startup:** Call `hub_check_inbox` + `hub_activity_feed` (since last session end) + `hub_priority_queue`
- **Task delegation:** Use `hub_submit_report` with type `task` or `handoff` and structured `delegation` context
- **Scheduling:** Use `hub_create_reminder` instead of cron — supports recurring intervals and Slack notifications
- **Agent discovery:** `hub_register_capability` on startup, `hub_find_agents_by_skill` for routing

## Known Issues (2026-02-14)

- Hub tools not loading as native MCP tools in Claude Code session (ToolSearch doesn't find them). Works via direct curl API calls. May need session restart or MCP connection debugging.
- Hub is currently empty: 0 agents registered, 0 messages, 0 alerts. Needs initial population.

## Alert Types
`alert`, `status`, `completion`, `error`, `email`, `webhook`, `task`, `handoff`

## Priority Levels
`critical`, `high`, `medium`, `low`

## Urgency Levels
`info`, `request`, `blocking`
