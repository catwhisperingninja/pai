---
date: 2026-02-14
status: active
topic: PAI_DIR must be project-scoped, not global
severity: critical
recurring: true
---

# PAI_DIR Must Point to Project .claude/ Directory

## Bug Summary
PAI_DIR was set to `/Users/dev/.claude` (global home) instead of `/Users/dev/Documents/github-projects/pai/.claude` (project-scoped). This broke all hook resolution, MEMORY capture, and voice notifications.

## Root Cause
Commit `78de024` ("Introduce new hooks and enhance settings") hardcoded PAI_DIR to the home directory. Likely triggered or surfaced by a Claude Code upgrade around 2026-02-14.

## Fix Applied
- Changed PAI_DIR in settings.json to `/Users/dev/Documents/github-projects/pai/.claude`
- Added +x permission to `capture-session.ts`

## RECURRING WARNING
- **DO NOT `git pull upstream main`** until upstream resolves PAI_DIR design (issues #265, #478, #549, #614)
- **DO NOT re-run INSTALL.ts** — it overwrites settings.json with hardcoded wrong values
- **After any merge**, verify PAI_DIR in settings.json is project-scoped
- Upstream has no fix merged as of 2026-02-14

## Design Decision
Project-scoped PAI is the correct approach. Global `~/.claude` is not viable across multiple OS/machines. Upstream hasn't resolved this yet (Discussion #536).

## Upstream References
- Issue #265: PAI_DIR Theory (fundamental confusion, 15 comments)
- Issue #478: Tilde not expanded in PAI_DIR
- Issue #549: $HOME/.claude literal not expanded
- Issue #614: INSTALL.ts generateSettingsJson() drifted from bundle
- Discussion #500: 3.x improvements planned but not shipped
- Discussion #536: Project-scoped vs global — unanswered
