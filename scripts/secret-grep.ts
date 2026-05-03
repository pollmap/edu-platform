/**
 * pre-commit 보안 grep ban (CLAUDE.md 보안 규정 v1).
 *   - 특정 IP / 사용자 경로 / 실명 / 토큰 패턴 감지 시 종료 코드 1
 *   - 추적 대상 파일에서만 검사 (node_modules 제외)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const BANNED_PATTERNS: Array<{ name: string; re: RegExp }> = [
  { name: 'VPS IP', re: /62\.171\.141\.206/ },
  { name: 'value alpha', re: /valuealpha@10\.0\.0\.2/ },
  { name: 'personal email/handle', re: /lch6817556/ },
  { name: 'Windows user path', re: /C:[\\/]Users[\\/]lch68/ },
  { name: 'Obsidian path', re: /\/root\/obsidian-vault/ },
  { name: 'Telegram bot token', re: /[0-9]{8,12}:AA[A-Za-z0-9_-]{30,}/ },
  { name: 'Private key block', re: /BEGIN\s+(?:RSA|DSA|EC|OPENSSH|PGP)\s*PRIVATE KEY/ },
];

const IGNORE = ['node_modules', '.next', '.git', 'tmp', 'public/fonts', '.vercel', 'dist', 'build', 'coverage'];
const ALLOWED_FILES = new Set([
  // 본 스크립트 자체는 패턴을 포함 (메타)
  'scripts/secret-grep.ts',
  // CLAUDE.md 보안 규정에 패턴 자체가 적혀있음
  'CLAUDE.md',
]);

interface Hit {
  file: string;
  line: number;
  pattern: string;
  excerpt: string;
}

const hits: Hit[] = [];

function walk(dir: string): void {
  for (const entry of readdirSync(dir)) {
    if (IGNORE.includes(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
    } else if (st.isFile()) {
      const rel = relative(ROOT, full).replace(/\\/g, '/');
      if (ALLOWED_FILES.has(rel)) continue;
      // text-ish files
      if (!/\.(ts|tsx|js|jsx|json|md|mdx|css|html|yml|yaml|env|config|toml)$/.test(entry)) continue;
      let content: string;
      try {
        content = readFileSync(full, 'utf8');
      } catch {
        continue;
      }
      const lines = content.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        for (const p of BANNED_PATTERNS) {
          if (p.re.test(lines[i])) {
            hits.push({ file: rel, line: i + 1, pattern: p.name, excerpt: lines[i].trim().slice(0, 120) });
          }
        }
      }
    }
  }
}

walk(ROOT);

console.log(`[secret-grep] scanned root: ${ROOT}`);
console.log(`[secret-grep] hits: ${hits.length}`);
for (const h of hits) {
  console.error(`  ${h.file}:${h.line}  [${h.pattern}]  ${h.excerpt}`);
}

process.exit(hits.length > 0 ? 1 : 0);
