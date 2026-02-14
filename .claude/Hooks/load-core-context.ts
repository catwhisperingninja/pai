#!/usr/bin/env bun
// $PAI_DIR/hooks/load-core-context.ts
// SessionStart hook: Inject skill/context files into Claude's context

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

interface SessionStartPayload {
  session_id: string;
  [key: string]: any;
}

function isSubagentSession(): boolean {
  // Check for subagent indicators
  // Subagents shouldn't load full context (they get it from parent)
  return process.env.CLAUDE_CODE_AGENT !== undefined ||
         process.env.SUBAGENT === 'true';
}

function getLocalTimestamp(): string {
  const date = new Date();
  const tz = process.env.TIME_ZONE || Intl.DateTimeFormat().resolvedOptions().timeZone;

  try {
    const localDate = new Date(date.toLocaleString('en-US', { timeZone: tz }));
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');
    const seconds = String(localDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} PST`;
  } catch {
    return new Date().toISOString();
  }
}

async function main() {
  try {
    // Skip for subagents - they get context from parent
    if (isSubagentSession()) {
      process.exit(0);
    }

    const stdinData = await Bun.stdin.text();
    if (!stdinData.trim()) {
      process.exit(0);
    }

    const payload: SessionStartPayload = JSON.parse(stdinData);
    const paiDir = process.env.PAI_DIR || join(homedir(), '.config', 'pai');

    // Look for CORE skill to load
    // The CORE skill contains identity, response format, and operating principles
    const coreSkillPath = join(paiDir, 'skills', 'CORE', 'SKILL.md');

    if (!existsSync(coreSkillPath)) {
      // No CORE skill installed - that's fine
      console.error('[PAI] No CORE skill found - skipping context injection');
      process.exit(0);
    }

    // Read the skill content
    const skillContent = readFileSync(coreSkillPath, 'utf-8');

    // Build MEMORY status summary
    const memDir = join(paiDir, 'MEMORY');
    let memoryStatus = '';
    try {
      if (existsSync(memDir)) {
        const lines: string[] = [];
        lines.push('## MEMORY System (Active)');
        lines.push(`Location: ${memDir}`);
        lines.push('Dirs: sessions/, raw-outputs/, State/, Signals/, Learning/, Work/, decisions/');

        // Show recent sessions
        const now = new Date();
        const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const sessDir = join(memDir, 'sessions', ym);
        if (existsSync(sessDir)) {
          const files = readdirSync(sessDir).filter(f => f.endsWith('.md')).sort().reverse().slice(0, 3);
          if (files.length > 0) {
            lines.push(`Recent sessions (${ym}): ${files.join(', ')}`);
          }
        }

        // Show last session summary (most recent .md file)
        const lastSessionDir = join(memDir, 'sessions');
        if (existsSync(lastSessionDir)) {
          const months = readdirSync(lastSessionDir).filter(f => !f.startsWith('.')).sort().reverse();
          for (const month of months) {
            const mDir = join(lastSessionDir, month);
            const mFiles = readdirSync(mDir).filter(f => f.endsWith('.md')).sort().reverse();
            if (mFiles.length > 0) {
              const lastFile = join(mDir, mFiles[0]);
              const content = readFileSync(lastFile, 'utf-8');
              // Extract just the frontmatter or first ~20 lines
              const preview = content.split('\n').slice(0, 20).join('\n');
              lines.push(`\nLast session file: sessions/${month}/${mFiles[0]}`);
              lines.push('```');
              lines.push(preview);
              lines.push('```');
              break;
            }
          }
        }

        memoryStatus = '\n\n' + lines.join('\n');
      }
    } catch { /* silent — MEMORY status is best-effort */ }

    // Output as system-reminder for Claude to process
    // This format is recognized by Claude Code
    const output = `<system-reminder>
PAI CORE CONTEXT (Auto-loaded at Session Start)

📅 CURRENT DATE/TIME: ${getLocalTimestamp()}

The following context has been loaded from ${coreSkillPath}:

${skillContent}
${memoryStatus}

This context is now active for this session. Follow all instructions, preferences, and guidelines contained above.
</system-reminder>

✅ PAI Context successfully loaded...`;

    // Output goes to stdout - Claude Code will see it
    console.log(output);

  } catch (error) {
    // Never crash - just skip
    console.error('Context loading error:', error);
  }

  process.exit(0);
}

main();
