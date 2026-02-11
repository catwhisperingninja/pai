#!/usr/bin/env bun
// $PAI_DIR/Hooks/lib/memory.ts
// Shared MEMORY system utilities

import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const PAI_DIR = process.env.PAI_DIR || join(homedir(), '.claude');

/**
 * Returns the absolute path to the MEMORY directory.
 */
export function getMemoryDir(): string {
  return join(PAI_DIR, 'MEMORY');
}

/**
 * mkdir -p wrapper — creates directory and all parents.
 */
export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Returns current YYYY-MM string.
 */
export function getYearMonth(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/**
 * Returns current YYYY-MM-DD string.
 */
export function getYearMonthDay(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Appends one JSON object as a line to a JSONL file. Creates parent dirs if needed.
 */
export function appendJSONL(filePath: string, data: Record<string, any>): void {
  const dir = join(filePath, '..');
  ensureDir(dir);
  const line = JSON.stringify(data) + '\n';
  appendFileSync(filePath, line, 'utf-8');
}

/**
 * Reads a JSON file from MEMORY/State/. Returns defaultValue if missing or invalid.
 */
export function readState<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = join(getMemoryDir(), 'State', filename);
    if (!existsSync(filePath)) return defaultValue;
    const raw = readFileSync(filePath, 'utf-8').trim();
    if (!raw || raw === 'null') return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Writes a JSON file to MEMORY/State/.
 */
export function writeState(filename: string, data: any): void {
  const stateDir = join(getMemoryDir(), 'State');
  ensureDir(stateDir);
  const filePath = join(stateDir, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

/**
 * State file defaults — seeded if they don't exist.
 */
const STATE_DEFAULTS: Record<string, any> = {
  'active-session.json': null,
  'algorithm-stats.json': { total: 0, compliant: 0 },
  'algorithm-streak.json': { current: 0, best: 0 },
  'format-streak.json': { current: 0, best: 0 },
};

/**
 * Creates all expected MEMORY directories and seeds State files.
 * Idempotent — safe to call on every session start.
 */
export function ensureMemoryStructure(): void {
  const mem = getMemoryDir();

  // Core directories (from README)
  const dirs = [
    'research',
    'sessions',
    'learnings',
    'decisions',
    'execution',
    'security',
    'recovery',
    'raw-outputs',
    'backups',
    'State',
    'Work',
    // Extended directories
    'Signals',
    'Learning/OBSERVE',
    'Learning/THINK',
    'Learning/PLAN',
    'Learning/BUILD',
    'Learning/EXECUTE',
    'Learning/VERIFY',
    'Learning/ALGORITHM',
    'Learning/sessions',
  ];

  for (const dir of dirs) {
    ensureDir(join(mem, dir));
  }

  // Seed State files if they don't exist
  for (const [filename, defaultValue] of Object.entries(STATE_DEFAULTS)) {
    const filePath = join(mem, 'State', filename);
    if (!existsSync(filePath)) {
      writeFileSync(filePath, JSON.stringify(defaultValue, null, 2) + '\n', 'utf-8');
    }
  }
}
