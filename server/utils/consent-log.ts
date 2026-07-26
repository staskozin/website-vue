import {
  appendFile,
  chmod,
  mkdir,
  open,
  readFile,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import {
  chmodSync,
  closeSync,
  mkdirSync,
  openSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute } from "node:path";
import { CONSENT_RETENTION_YEARS } from "../../shared/analytics";

export type ConsentLogRecord = {
  eventId: string;
  acceptedAt: string;
  decision: "accepted";
  consentVersion: string;
  ip: string;
  userAgent: string;
  page: string;
};

const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;

let initializedPath: string | null = null;
let lastCleanupAt = 0;
let operationQueue: Promise<void> = Promise.resolve();

function enqueue<T>(operation: () => Promise<T>): Promise<T> {
  const result = operationQueue.then(operation, operation);
  operationQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

function getConfiguredPath() {
  const logPath = process.env.CONSENT_LOG_PATH;

  if (!logPath) {
    throw new Error("CONSENT_LOG_PATH is required to start the application");
  }

  if (!isAbsolute(logPath)) {
    throw new Error("CONSENT_LOG_PATH must be an absolute path");
  }

  return logPath;
}

function retentionCutoff(now: Date) {
  const cutoff = new Date(now);
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - CONSENT_RETENTION_YEARS);
  return cutoff.getTime();
}

async function cleanupExpiredRecords(logPath: string, now = new Date()) {
  const contents = await readFile(logPath, "utf8");
  if (!contents.trim()) return;

  const lines = contents.split(/\r?\n/).filter(Boolean);
  const cutoff = retentionCutoff(now);
  const keptLines = lines.filter((line) => {
    try {
      const record = JSON.parse(line) as { acceptedAt?: unknown };
      if (typeof record.acceptedAt !== "string") return true;

      const acceptedAt = Date.parse(record.acceptedAt);
      return Number.isNaN(acceptedAt) || acceptedAt >= cutoff;
    } catch {
      return true;
    }
  });

  if (keptLines.length === lines.length) return;

  const temporaryPath = `${logPath}.${process.pid}.${Date.now()}.tmp`;
  const nextContents = keptLines.length ? `${keptLines.join("\n")}\n` : "";

  try {
    await writeFile(temporaryPath, nextContents, {
      encoding: "utf8",
      mode: 0o600,
    });
    await rename(temporaryPath, logPath);
    await chmod(logPath, 0o600);
  } catch (error) {
    await unlink(temporaryPath).catch(() => undefined);
    throw error;
  }
}

function cleanupExpiredRecordsSync(logPath: string, now = new Date()) {
  const contents = readFileSync(logPath, "utf8");
  if (!contents.trim()) return;

  const lines = contents.split(/\r?\n/).filter(Boolean);
  const cutoff = retentionCutoff(now);
  const keptLines = lines.filter((line) => {
    try {
      const record = JSON.parse(line) as { acceptedAt?: unknown };
      if (typeof record.acceptedAt !== "string") return true;

      const acceptedAt = Date.parse(record.acceptedAt);
      return Number.isNaN(acceptedAt) || acceptedAt >= cutoff;
    } catch {
      return true;
    }
  });

  if (keptLines.length === lines.length) return;

  const temporaryPath = `${logPath}.${process.pid}.${Date.now()}.tmp`;
  const nextContents = keptLines.length ? `${keptLines.join("\n")}\n` : "";

  try {
    writeFileSync(temporaryPath, nextContents, {
      encoding: "utf8",
      mode: 0o600,
    });
    renameSync(temporaryPath, logPath);
    chmodSync(logPath, 0o600);
  } catch (error) {
    try {
      unlinkSync(temporaryPath);
    } catch {
      // The temporary file may not have been created.
    }
    throw error;
  }
}

async function initializeInternal() {
  if (initializedPath) return initializedPath;

  const logPath = getConfiguredPath();
  await mkdir(dirname(logPath), { recursive: true, mode: 0o700 });

  const handle = await open(logPath, "a", 0o600);
  await handle.close();
  await chmod(logPath, 0o600);
  await cleanupExpiredRecords(logPath);

  initializedPath = logPath;
  lastCleanupAt = Date.now();
  return logPath;
}

export function initializeConsentLogSync() {
  if (initializedPath) return;

  const logPath = getConfiguredPath();
  mkdirSync(dirname(logPath), { recursive: true, mode: 0o700 });

  const descriptor = openSync(logPath, "a", 0o600);
  closeSync(descriptor);
  chmodSync(logPath, 0o600);
  cleanupExpiredRecordsSync(logPath);

  initializedPath = logPath;
  lastCleanupAt = Date.now();
}

export async function appendConsentRecord(record: ConsentLogRecord) {
  await enqueue(async () => {
    const logPath = await initializeInternal();
    const now = Date.now();

    if (now - lastCleanupAt >= CLEANUP_INTERVAL_MS) {
      await cleanupExpiredRecords(logPath, new Date(now));
      lastCleanupAt = now;
    }

    await appendFile(logPath, `${JSON.stringify(record)}\n`, {
      encoding: "utf8",
      mode: 0o600,
    });
  });
}
