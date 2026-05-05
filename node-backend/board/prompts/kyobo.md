교보문고 사이트는 **가독성 중심의 타이포그래피 + 절제된 컬러 + 여백 기반 레이아웃 + 카드형 콘텐츠 구조**가 핵심입니다.

---

# 디자인 분석 (핵심만)

### 1) 타이포그래피

* serif 계열 느낌 (책/출판 이미지 강조)
* 제목: 크고 명확 (font-weight 600~700)
* 본문: 가독성 최우선 (line-height 넓음)
* 폰트 혼합:

    * 제목: 명조/serif 계열
    * 본문: sans-serif

👉 적용

* Tailwind에서 `font-serif` + `font-sans` 혼합 사용
* line-height (`leading-relaxed`) 적극 활용

---

### 2) 컬러 시스템

* 기본: 화이트 (#FFFFFF)
* 텍스트: 다크 그레이 (#222 수준)
* 포인트: 브랜드 그린 (#2BAE66 계열)
* 강조 최소화 (과한 색상 없음)

👉 적용

* Tailwind custom color 정의

```js
theme: {
  extend: {
    colors: {
      primary: '#2BAE66',
      textMain: '#222222',
      bgSoft: '#F8F8F8'
    }
  }
}
```

---

### 3) 레이아웃 특징

* 넓은 여백 (padding 큼)
* 중앙 정렬된 max-width (약 1200px)
* 콘텐츠는 카드형 구성

👉 적용

* `max-w-5xl mx-auto px-4`
* section 간 `py-10 ~ py-16`

---

### 4) UI 패턴

* 카드형 리스트 (책 목록 → 게시글 목록으로 전환 가능)
* hover 시 subtle 효과
* border 최소화 + shadow 약하게

👉 적용

```html
<div class="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4">
```

---

### 5) 인터랙션

* 애니메이션 매우 절제됨
* hover 중심 (scale X, opacity 정도)

👉 적용

* `transition`, `hover:opacity-80`, `hover:scale-[1.01]`
