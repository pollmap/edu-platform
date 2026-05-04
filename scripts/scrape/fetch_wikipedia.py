"""
위키미디어 REST API 로 한국어 위키백과 요약 수집.
- 한국사 시대 9개, 8 행성, 생물 5계 대표
- CC BY-SA 3.0 라이선스 (위키백과)
- API 인증 X, 공개 엔드포인트

Usage: python scripts/scrape/fetch_wikipedia.py
Output: docs/data-sources/wikipedia-{korea-history,planets,biology}.json
"""

from __future__ import annotations

import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "docs" / "data-sources"
OUT_DIR.mkdir(parents=True, exist_ok=True)

UA = "edu-platform-research/1.0 (https://github.com/pollmap/edu-platform; lch6817556@gmail.com)"

REST = "https://ko.wikipedia.org/api/rest_v1/page/summary/{title}"


def fetch_summary(title: str) -> dict[str, Any] | None:
    url = REST.format(title=urllib.parse.quote(title, safe=""))
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return {
            "title": data.get("title"),
            "extract": data.get("extract"),
            "description": data.get("description"),
            "thumbnail": (data.get("thumbnail") or {}).get("source"),
            "originalimage": (data.get("originalimage") or {}).get("source"),
            "pageid": data.get("pageid"),
            "wikibase_item": data.get("wikibase_item"),
            "url": (data.get("content_urls") or {}).get("desktop", {}).get("page"),
            "license": "CC BY-SA 3.0 (Wikipedia ko)",
        }
    except Exception as e:
        print(f"  ! {title}: {e}", file=sys.stderr)
        return None


KOREA_HISTORY_ERAS = [
    ("선사_시대", "선사 시대"),
    ("고조선", "고조선"),
    ("삼국_시대", "삼국 시대"),
    ("고구려", "고구려"),
    ("백제", "백제"),
    ("신라", "신라"),
    ("발해", "발해"),
    ("통일_신라", "통일 신라"),
    ("고려", "고려"),
]

KOREA_FIGURES = [
    ("세종", "세종대왕"),
    ("이순신", "이순신"),
    ("광개토대왕", "광개토대왕"),
    ("정약용", "정약용"),
    ("정조_(조선)", "정조 (조선)"),
]

PLANETS = [
    ("수성", "수성"),
    ("금성", "금성"),
    ("지구", "지구"),
    ("화성", "화성"),
    ("목성", "목성"),
    ("토성", "토성"),
    ("천왕성", "천왕성"),
    ("해왕성", "해왕성"),
]

BIOLOGY = [
    ("식물", "식물계"),
    ("동물", "동물계"),
    ("균계", "균계"),
    ("원생생물", "원생생물계"),
    ("세균", "세균계"),
]

KOREA_HISTORY_LATE = [
    ("조선", "조선"),
    ("대한제국", "대한제국"),
    ("일제강점기", "일제 강점기"),
    ("대한민국_임시정부", "대한민국 임시정부"),
    ("대한민국", "대한민국"),
    ("6월_민주_항쟁", "6월 민주 항쟁"),
]

KOREA_GEOGRAPHY = [
    ("서울특별시", "서울특별시"),
    ("부산광역시", "부산광역시"),
    ("대전광역시", "대전광역시"),
    ("대구광역시", "대구광역시"),
    ("광주광역시", "광주광역시"),
    ("인천광역시", "인천광역시"),
    ("울산광역시", "울산광역시"),
    ("세종특별자치시", "세종특별자치시"),
    ("제주특별자치도", "제주특별자치도"),
    ("경기도", "경기도"),
    ("강원특별자치도", "강원특별자치도"),
    ("충청북도", "충청북도"),
    ("충청남도", "충청남도"),
    ("전북특별자치도", "전북특별자치도"),
    ("전라남도", "전라남도"),
    ("경상북도", "경상북도"),
    ("경상남도", "경상남도"),
]

ANIMALS = [
    ("호랑이", "호랑이 (포유류)"),
    ("반달가슴곰", "반달가슴곰 (포유류)"),
    ("두루미", "두루미 (조류)"),
    ("까치", "까치 (조류)"),
    ("개구리", "개구리 (양서류)"),
    ("도마뱀", "도마뱀 (파충류)"),
    ("연어", "연어 (어류)"),
    ("나비", "나비 (곤충)"),
    ("거미", "거미 (절지)"),
    ("문어", "문어 (연체)"),
]


def fetch_set(name: str, items: list[tuple[str, str]]) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    print(f"== {name} ({len(items)} 건) ==")
    for slug, label in items:
        print(f"  - {label}")
        s = fetch_summary(slug)
        if s is not None:
            s["label"] = label
            out.append(s)
        time.sleep(0.3)  # rate limit 예의
    return out


def save(name: str, items: list[dict[str, Any]]) -> Path:
    p = OUT_DIR / f"wikipedia-{name}.json"
    payload = {
        "source": "ko.wikipedia.org REST v1",
        "license": "CC BY-SA 3.0",
        "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "count": len(items),
        "items": items,
    }
    p.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  → {p.relative_to(ROOT)} ({len(items)} 건)")
    return p


def main() -> int:
    save("korea-history", fetch_set("Korea history", KOREA_HISTORY_ERAS))
    save("korea-figures", fetch_set("Korea figures", KOREA_FIGURES))
    save("planets", fetch_set("Planets", PLANETS))
    save("biology", fetch_set("Biology kingdoms", BIOLOGY))
    save("korea-history-late", fetch_set("Korea history late", KOREA_HISTORY_LATE))
    save("korea-geography", fetch_set("Korea geography", KOREA_GEOGRAPHY))
    save("animals", fetch_set("Animals", ANIMALS))
    print("DONE.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
