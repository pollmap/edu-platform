"""Append wave 5 overrides from tmp/mappings-w5.txt."""
import re
from pathlib import Path


def main() -> int:
    mp = Path('tmp/mappings-w5.txt')
    pairs = []
    for line in mp.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if '|' not in line:
            continue
        uid, comp = line.split('|', 1)
        pairs.append((uid, comp))

    ov = Path('lib/curriculum/overrides.ts')
    text = ov.read_text(encoding='utf-8')
    existing = set(re.findall(r"'([A-Za-z0-9-]+)':\s*\{", text))

    new_entries: list[str] = []
    for uid, comp in pairs:
        if uid in existing:
            continue
        new_entries.append(
            f"  '{uid}': {{\n"
            f"    status: 'draft',\n"
            f"    prerequisites: [],\n"
            f"    achievementStandards: [],\n"
            f"    componentName: '{comp}',\n"
            f"    patternIds: [1],\n"
            f"  }},"
        )

    print(f"existing: {len(existing)} · adding: {len(new_entries)}")
    if not new_entries:
        return 0

    block = '\n'.join(new_entries) + '\n'
    last = text.rstrip().rfind('};')
    new_text = text[:last] + block + text[last:]
    ov.write_text(new_text, encoding='utf-8', newline='\n')
    print(f"wrote: {ov}")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
