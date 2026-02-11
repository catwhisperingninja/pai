#!/usr/bin/env bun
// $PAI_DIR/Hooks/lib/observability.ts
// Shared observability utilities — writes events to MEMORY/raw-outputs/

import { existsSync, mkdirSync, appendFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const PAI_DIR = process.env.PAI_DIR || join(homedir(), '.claude');
const MEMORY_DIR = join(PAI_DIR, 'MEMORY');

/**
 * Returns ISO timestamp in local timezone.
 */
export function getCurrentTimestamp(): string {
  const tz = process.env.TIME_ZONE || Intl.DateTimeFormat().resolvedOptions().timeZone;
  try {
    const date = new Date();
    const local = new Date(date.toLocaleString('en-US', { timeZone: tz }));
    const y = local.getFullYear();
    const mo = String(local.getMonth() + 1).padStart(2, '0');
    const d = String(local.getDate()).padStart(2, '0');
    const h = String(local.getHours()).padStart(2, '0');
    const mi = String(local.getMinutes()).padStart(2, '0');
    const s = String(local.getSeconds()).padStart(2, '0');
    return `${y}-${mo}-${d}T${h}:${mi}:${s}`;
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Returns the source app name from env (e.g., "Pi").
 */
export function getSourceApp(): string {
  return process.env.PAI_SOURCE_APP || process.env.DA || 'PAI';
}

/**
 * Returns YYYY-MM string for the current month.
 */
function getYearMonth(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/**
 * Appends an event object as a JSONL line to MEMORY/raw-outputs/YYYY-MM/events.jsonl.
 * Creates the month directory if needed. Fails silently — never crashes hooks.
 */
export async function sendEventToObservability(event: Record<string, any>): Promise<void> {
  try {
    const monthDir = join(MEMORY_DIR, 'raw-outputs', getYearMonth());
    if (!existsSync(monthDir)) {
      mkdirSync(monthDir, { recursive: true });
    }

    const eventsFile = join(monthDir, 'events.jsonl');
    const line = JSON.stringify({ ...event, _ts: new Date().toISOString() }) + '\n';
    appendFileSync(eventsFile, line, 'utf-8');
  } catch {
    // Never crash — observability is best-effort
  }
}
