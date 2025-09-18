export function uniqueAlias(base: string, tag: string) {
  // ex: base = "user@gmail.com", tag = "etsy"
  const [name, domain] = base.split('@');
  const stamp = new Date()
    .toISOString()
    .replaceAll('-', '')
    .replaceAll(':', '')
    .replaceAll('.', '')
    .slice(0, 15);
  return `${name}+${tag}${stamp}@${domain}`;
}
