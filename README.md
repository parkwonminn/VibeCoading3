# My Site — 반응형 랜딩 페이지

> 순수 HTML · CSS · JavaScript만으로 구현한 프로덕션 수준의 정적 랜딩 페이지입니다.  
> 외부 프레임워크·라이브러리 없이 웹 표준과 접근성 지침을 준수하여 제작했습니다.

---

## 미리보기

| 섹션 | 설명 |
|------|------|
| **히어로** | 그라디언트 배경 위 타이틀 + 인사 토스트 버튼 |
| **주요 기능** | 3열 카드 그리드 (반응형 auto-fit) |
| **연락처** | 이름 · 이메일 · 메시지 입력 폼 + 유효성 검사 |
| **푸터** | 실시간 시계 + 자동 갱신 저작권 연도 |

---

## 기술 스택

```
HTML5   —  시멘틱 마크업, OG 태그, aria 접근성 속성
CSS3    —  CSS 변수(Custom Properties), Grid, Flexbox, 반응형 미디어쿼리
JavaScript (ES6+)  —  IntersectionObserver, requestAnimationFrame, 이메일 정규식 검증
Google Fonts  —  Noto Sans KR
```

---

## 주요 기능

### 인터랙션
- **인사 토스트** — "인사하기" 버튼 클릭 시 랜덤 메시지를 화면 우하단 슬라이드인 알림으로 표시 (`alert()` 미사용)
- **연락처 폼 유효성 검사** — 이름 비어있음 / 이메일 형식 오류 / 메시지 비어있음 각각 개별 에러 토스트 출력, 성공 시 폼 초기화

### 내비게이션
- **스크롤 활성 nav** — `IntersectionObserver`로 현재 보이는 섹션의 nav 링크에 골드 언더라인 자동 표시
- **헤더 그림자** — 20px 이상 스크롤 시 `header--scrolled` 클래스로 드롭 섀도 적용
- **모바일 햄버거 메뉴** — 640px 이하에서 3선 → X 애니메이션 토글, 링크 클릭 시 자동 닫힘
- **`scroll-padding-top`** — 고정 헤더 높이(64px)만큼 앵커 이동 오프셋 자동 보정

### 접근성 (a11y)
- "본문으로 건너뛰기" 링크 (키보드 접근성)
- 모든 인터랙티브 요소에 `aria-label` / `aria-expanded` / `aria-live` 적용
- `:focus-visible` 커스텀 포커스 링 (골드 컬러)
- `role="list"`, `aria-labelledby`로 스크린리더 구조 명확화

### SEO
- `<meta name="description">` 및 Open Graph (`og:title`, `og:description`, `og:type`) 태그
- 저작권 연도 JS로 자동 갱신 (하드코딩 없음)

---

## 파일 구조

```
VibeCoading3/
├── index.html          # 마크업 및 시멘틱 구조
├── style.css           # CSS 변수 기반 다크 테마, 반응형 레이아웃
├── script.js           # 인터랙션 · 접근성 · 폼 처리 로직
└── README.md
```

---

## 로컬 실행

별도 빌드 과정 없이 `index.html`을 브라우저로 열면 바로 실행됩니다.

```bash
# VS Code Live Server 사용 시
code .
# → Go Live 버튼 클릭

# 또는 Python 간이 서버
python -m http.server 3000
```

---

## 디자인 시스템

| 변수 | 값 | 용도 |
|------|----|------|
| `--color-bg` | `#0f0f14` | 전체 배경 |
| `--color-surface` | `#1a1a22` | 카드 · 섹션 배경 |
| `--color-accent` | `#c9a66b` | 골드 포인트 컬러 |
| `--color-primary` | `#e8d5b7` | 주요 텍스트 |
| `--color-text-muted` | `#9a9489` | 보조 텍스트 |
| `--header-height` | `64px` | 고정 헤더 높이 (scroll-padding 기준) |

---

## 브라우저 지원

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| ✅ 최신 | ✅ 최신 | ✅ 최신 | ✅ 최신 |

> `backdrop-filter` 미지원 환경에서는 반투명 블러 없이 단색 배경으로 graceful fallback 적용됩니다.

---

## 라이선스

MIT License © 2026 parkwonminn
