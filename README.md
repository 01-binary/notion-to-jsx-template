# notion-to-jsx Template

[notion-to-jsx](https://www.npmjs.com/package/notion-to-jsx)와 [notion-to-utils](https://www.npmjs.com/package/notion-to-utils)를 활용한 Notion CMS 블로그 템플릿.

## Tech Stack

- **Next.js 16** (App Router, React Compiler, `use cache`)
- **React 19**
- **Tailwind CSS v4**
- **Jotai** (상태 관리)
- **notion-to-jsx / notion-to-utils** (Notion 렌더링)

## Quick Start

### 1. Notion Database 준비

아래 속성을 가진 Notion Database를 생성하세요:

| Property    | Type     | Description        |
| ----------- | -------- | ------------------ |
| Name        | title    | 포스트 제목        |
| Desc        | rich_text| 포스트 설명        |
| Slug        | rich_text| URL slug           |
| Category    | select   | 카테고리           |
| Date        | date     | 작성일             |
| isPublished | checkbox | 게시 여부 (prod용) |

### 2. Notion Integration 생성

1. [Notion Integrations](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. Database에 Integration 연결 (Share → Invite)
3. Internal Integration Secret 복사

### 3. 환경 변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열고 값을 입력하세요:

```
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_database_id_here
BLOG_URL=http://localhost:3000
```

### 4. 설치 및 실행

```bash
pnpm install
pnpm dev
```

## Customization

### 사이트 설정

`site.config.ts`에서 블로그 기본 정보를 수정하세요:

```ts
export const siteConfig = {
  blogName: 'My Blog',
  author: 'Your Name',
  homeTitle: 'My Blog',
  seoDefaultDesc: 'A blog powered by Notion',
  url: 'https://example.com',
  github: '',
  mail: '',
};
```

### 테마 색상

`src/assets/styles/index.css`에서 CSS 변수를 수정하여 테마를 커스터마이징할 수 있습니다.

### 폰트

기본적으로 시스템 폰트를 사용합니다. 커스텀 폰트를 사용하려면 `src/assets/styles/index.css`의 `font-family`를 수정하세요.

## Features

- 카테고리 필터링
- 무한 스크롤
- 다크 모드 (Light / Dark / System)
- 이미지 blur placeholder
- Table of Contents
- RSS 피드 (`/rss.xml`)
- 사이트맵 (`/sitemap.xml`)
- SEO 메타데이터 (OpenGraph, Twitter Card)
- 반응형 디자인

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/notion-to-jsx-template)

Vercel에 배포할 때 Environment Variables에 `NOTION_TOKEN`, `NOTION_DATABASE_ID`, `BLOG_URL`을 설정하세요.

## Project Structure

```
app/
├── (home)/              # 홈페이지 (포스트 목록)
├── posts/[slug]/        # 포스트 상세 페이지
├── rss.xml/             # RSS 피드
├── sitemap.xml/         # 사이트맵
├── _components/         # 공통 컴포넌트 (Header, Footer, Theme)
├── _providers/          # Context Providers
├── layout.tsx           # 루트 레이아웃
├── error.tsx            # 에러 페이지
└── not-found.tsx        # 404 페이지

src/
├── assets/styles/       # 글로벌 CSS
├── atoms/               # Jotai atoms
├── hooks/               # 공통 hooks
├── interfaces/          # TypeScript 타입
├── lib/                 # 환경변수, dayjs 등
└── utils/               # 유틸리티 함수
```
