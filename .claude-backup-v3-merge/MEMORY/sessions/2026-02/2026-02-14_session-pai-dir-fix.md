---
session_id: pai-dir-fix
project: pai
date: 2026-02-14
tags: [bugfix, critical, pai-dir, upstream]
---

# Session: PAI_DIR Critical Fix

## What Happened
- Discovered PAI_DIR resolving to `/Users/dev/.claude` (global) instead of project `.claude/`
- Stop hook "permission denied" error traced to two causes:
  1. PAI_DIR pointing to wrong directory
  2. `capture-session.ts` missing execute permission

## Investigation
- Traced to commit `78de024` which changed PAI_DIR from `__HOME__/.claude` placeholder to hardcoded `/Users/dev/.claude`
- Reviewed upstream GitHub issues: #265, #478, #549, #614, #646
- Reviewed upstream discussions: #500, #536
- Confirmed this is a chronic unresolved upstream design problem

## Fixes Applied
1. `settings.json`: PAI_DIR → `/Users/dev/Documents/github-projects/pai/.claude`
2. `capture-session.ts`: chmod +x

## Key Decision
- DO NOT pull from upstream until PAI_DIR design is resolved
- Project-scoped install is the correct approach
- Created recurring decision note in MEMORY/decisions/
