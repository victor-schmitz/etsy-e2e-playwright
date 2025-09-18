type Level = 'debug' | 'info' | 'warn' | 'error';

const TAG: Record<Level, string> = {
  debug: '🔵 DEBUG',
  info:  '🟢 INFO',
  warn:  '🟡 WARN',
  error: '🔴 ERROR',
};

function redact(key: string, value: unknown) {
  const hit = /(pass|password|token|secret|auth|cookie)/i;
  if (hit.test(key)) return '***';
  if (typeof value === 'string' && hit.test(value)) return '***';
  return value as any;
}
function fmt(level: Level, msg: string, meta?: unknown) {
  const head = `${TAG[level]}: ${msg}`;
  if (meta === undefined) return head;
  try {
    return `${head}\n${JSON.stringify(meta, redact, 2)}`;
  } catch {
    return `${head}\n${String(meta)}`;
  }
}

export const logger = {
  debug(msg: string, meta?: unknown) { console.log(fmt('debug', msg, meta)); },
  info (msg: string, meta?: unknown) { console.log(fmt('info',  msg, meta)); },
  warn (msg: string, meta?: unknown) { console.warn(fmt('warn', msg, meta)); },
  error(msg: string, meta?: unknown) { console.error(fmt('error', msg, meta)); },
};
