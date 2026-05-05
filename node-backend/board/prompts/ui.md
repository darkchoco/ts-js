아래 PRD를 기반으로 본 board 프로젝트에 UI를 구성해줘.  
구분을 위해 가능하면 기존 파일의 변경보다는 파일을 추가하는 방향으로 해서 구성 부탁해.

---

# 기술 적용 방향

### Frontend

* Tailwind CSS

### 폰트

* Google Fonts 또는 CDN

    * 예:

        * Noto Serif KR (제목)
        * Noto Sans KR (본문)

# PRD (Product Requirements Document)

## 1) 목표

* 가독성 중심의 게시판 UI 구현
* 교보문고(https://www.kyobobook.co.kr) 스타일의 정돈된 디자인 제공
* 콘텐츠(글) 중심 UX

---

## 2) 주요 기능

### 게시글 목록

* 카드형 리스트 UI
* 제목 / 작성자 / 날짜 표시
* hover 효과

### 게시글 상세

* 큰 제목 (serif)
* 본문 가독성 강조
* 넓은 line-height

### 글 작성

* 심플한 form UI
* 입력 필드 minimal 스타일

---

## 3) UI 요구사항

### Layout

* max-width: 1200px
* 중앙 정렬
* section 간 충분한 여백

### Typography

* 제목: serif, bold
* 본문: sans-serif, line-height 1.6+

### Color

* 배경: white
* 텍스트: dark gray
* 포인트: green

---

## 4) 스타일 규칙 (Tailwind)

* spacing: `p-4`, `p-6`, `py-12`
* radius: `rounded-lg`
* shadow: `shadow-sm`
* hover: `hover:shadow-md`

---

## 5) 비기능 요구사항

* 반응형 (모바일 대응)
* 접근성 기본 준수 (aria, semantic HTML)
* 빠른 렌더링 (CSS 최소화)
