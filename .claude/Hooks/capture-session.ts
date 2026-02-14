#!/usr/bin/env bun
// $PAI_DIR/Hooks/capture-session.ts
// Stop hook: Captures session summary to MEMORY

import { readFileSync, existsSync } from 'fs';
import {
  getMemoryDir,
  ensureDir,
  getYearMonth,
  getYearMonthDay,
  appendJSONL,
  readState,
  writeState,
} from './lib/memory';
import { join } from 'path';
import { homedir } from 'os';

/**
 * Expand leading ~ to the user's home directory.
 * Node/Bun fs APIs don't handle ~ — only the shell does.
 */
function expandTilde(p: string): string {
  return p.startsWith('~') ? p.replace(/^~/, homedir()) : p;
}

interface StopPayload {
  session_id: string;
  transcript_path: string;
  hook_event_name: string;
}

interface ActiveSession {
  session_id: string;
  started: string;
  cwd: string;
  project: string;
}

interface TranscriptStats {
  userTurns: number;
  assistantTurns: number;
  toolUses: number;
  toolNames: Record<string, number>;
}

/**
 * Parse the transcript JSONL and count turns/tools.
 */
function parseTranscript(transcriptPath: string): TranscriptStats {
  const stats: TranscriptStats = {
    userTurns: 0,
    assistantTurns: 0,
    toolUses: 0,
    toolNames: {},
  };

  try {
    if (!existsSync(transcriptPath)) return stats;
    const content = readFileSync(transcriptPath, 'utf-8');
    const lines = content.trim().split('\n');

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const entry = JSON.parse(line);
        switch (entry.type) {
          case 'human':
          case 'user':
            stats.userTurns++;
            break;
          case 'assistant':
            stats.assistantTurns++;
            // Count tool_use blocks in assistant messages
            if (Array.isArray(entry.message?.content)) {
              for (const block of entry.message.content) {
                if (block.type === 'tool_use') {
                  stats.toolUses++;
                  const name = block.name || 'unknown';
                  stats.toolNames[name] = (stats.toolNames[name] || 0) + 1;
                }
              }
            }
            break;
        }
      } catch {
        // Skip invalid lines
      }
    }
  } catch {
    // Return zero stats on read failure
  }

  return stats;
}

/**
 * Format duration from ms to human-readable string.
 */
function formatDuration(ms: number): string {
  if (ms < 0) return 'unknown';
  const secs = Math.floor(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const remSecs = secs % 60;
  if (mins < 60) return `${mins}m ${remSecs}s`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hours}h ${remMins}m`;
}

/**
 * Build a markdown session summary.
 */
function buildSummary(
  session: ActiveSession,
  stats: TranscriptStats,
  durationMs: number,
  sessionId: string
): string {
  const topTools = Object.entries(stats.toolNames)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => `${name} (${count})`)
    .join(', ');

  return `---
session_id: ${sessionId}
project: ${session.project}
cwd: ${session.cwd}
started: ${session.started}
ended: ${new Date().toISOString()}
duration: ${formatDuration(durationMs)}
user_turns: ${stats.userTurns}
assistant_turns: ${stats.assistantTurns}
tool_uses: ${stats.toolUses}
---

# Session: ${session.project}

- **Duration:** ${formatDuration(durationMs)}
- **Turns:** ${stats.userTurns} user / ${stats.assistantTurns} assistant
- **Tool uses:** ${stats.toolUses}
${topTools ? `- **Top tools:** ${topTools}` : ''}
`;
}

async function main() {
  try {
    // Read stdin payload
    const stdinData = await Bun.stdin.text();
    if (!stdinData.trim()) {
      process.exit(0);
    }

    const payload: StopPayload = JSON.parse(stdinData);
    const mem = getMemoryDir();

    // Resolve transcript path (Claude Code sends ~ which fs APIs don't expand)
    const transcriptPath = payload.transcript_path
      ? expandTilde(payload.transcript_path)
      : '';

    // Validate transcript path (defense-in-depth against path traversal)
    if (transcriptPath && !transcriptPath.includes('.claude/')) {
      console.error('[PAI] Rejected transcript_path: not within .claude/');
      process.exit(0);
    }

    // Read active session state
    const session = readState<ActiveSession | null>('active-session.json', null);
    if (!session) {
      // No active session recorded — nothing to summarize
      process.exit(0);
    }

    // Parse transcript stats
    const stats = parseTranscript(transcriptPath);

    // Calculate duration
    const startTime = new Date(session.started).getTime();
    const endTime = Date.now();
    const durationMs = startTime > 0 ? endTime - startTime : -1;

    // Short session ID for filenames (first 8 chars)
    const shortId = payload.session_id.substring(0, 8);

    // Write markdown summary to MEMORY/sessions/YYYY-MM/
    const ym = getYearMonth();
    const ymd = getYearMonthDay();
    const sessionsDir = join(mem, 'sessions', ym);
    ensureDir(sessionsDir);

    const summaryPath = join(sessionsDir, `${ymd}_${shortId}.md`);
    const summary = buildSummary(session, stats, durationMs, payload.session_id);

    const { writeFileSync } = await import('fs');
    writeFileSync(summaryPath, summary, 'utf-8');

    // Append to session-events JSONL
    const eventsDir = join(mem, 'raw-outputs', ym);
    appendJSONL(join(eventsDir, 'session-events.jsonl'), {
      event: 'session_end',
      session_id: payload.session_id,
      project: session.project,
      cwd: session.cwd,
      started: session.started,
      ended: new Date().toISOString(),
      duration_ms: durationMs > 0 ? durationMs : null,
      user_turns: stats.userTurns,
      assistant_turns: stats.assistantTurns,
      tool_uses: stats.toolUses,
      top_tools: stats.toolNames,
    });

    // Clear active session
    writeState('active-session.json', null);

    console.error(`[PAI] Session captured: ${session.project} (${formatDuration(durationMs)})`);
  } catch (error) {
    // Never crash — session capture is best-effort
    console.error('[PAI] Session capture error:', error);
  }

  process.exit(0);
}

main();
