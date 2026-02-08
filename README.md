# notion-to-jsx Template

[English](#english) | [한국어](#한국어)

---

## English

A Notion CMS blog template built with [notion-to-jsx](https://www.npmjs.com/package/notion-to-jsx) and [notion-to-utils](https://www.npmjs.com/package/notion-to-utils).

### Tech Stack

- **Next.js 16** (App Router, React Compiler, `use cache`)
- **React 19**
- **Tailwind CSS v4**
- **Jotai** (State Management)
- **notion-to-jsx / notion-to-utils** (Notion Rendering)

### Quick Start

#### 1. Prepare Notion Database

Create a Notion Database with the following properties:

| Property    | Type      | Description              |
| ----------- | --------- | ------------------------ |
| Name        | title     | Post title               |
| Desc        | rich_text | Post description         |
| Slug        | rich_text | URL slug                 |
| Category    | select    | Category                 |
| Date        | date      | Published date           |
| isPublished | checkbox  | Publish flag (prod only) |

#### 2. Create Notion Integration

1. Create a new Integration at [Notion Integrations](https://www.notion.so/my-integrations)
2. Connect the Integration to your Database (Share → Invite)
3. Copy the Internal Integration Secret

#### 3. Set Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_database_id_here
```

#### 4. Install & Run

```bash
pnpm install
pnpm dev
```

### Customization

#### Site Config

Edit `site.config.ts` to update your blog info:

```ts
export const siteConfig = {
  blogName: 'My Blog',
  author: 'Your Name',
  homeTitle: 'My Blog',
  seoDefaultDesc: 'A blog powered by Notion',
  url: 'https://your-domain.com',
  github: '',
  mail: '',
};
```

#### Theme Colors

Customize the theme by editing CSS variables in `src/assets/styles/index.css`.

#### Fonts

System fonts are used by default. To use custom fonts, update `font-family` in `src/assets/styles/index.css`.

### Features

- Category filtering
- Infinite scroll
- Dark mode (Light / Dark / System)
- Image blur placeholder
- Table of Contents
- RSS feed (`/rss.xml`)
- Sitemap (`/sitemap.xml`)
- SEO metadata (OpenGraph, Twitter Card)
- Responsive design

### Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/01-binary/notion-to-jsx-template)

Set `NOTION_TOKEN` and `NOTION_DATABASE_ID` in Vercel Environment Variables.

---

## 한국어

[notion-to-jsx](https://www.npmjs.com/package/notion-to-jsx)와 [notion-to-utils](https://www.npmjs.com/package/notion-to-utils)를 활용한 Notion CMS 블로그 템플릿.

### 기술 스택

- **Next.js 16** (App Router, React Compiler, `use cache`)
- **React 19**
- **Tailwind CSS v4**
- **Jotai** (상태 관리)
- **notion-to-jsx / notion-to-utils** (Notion 렌더링)

### 빠른 시작

#### 1. Notion Database 준비

아래 속성을 가진 Notion Database를 생성하세요:

| Property    | Type      | Description        |
| ----------- | --------- | ------------------ |
| Name        | title     | 포스트 제목        |
| Desc        | rich_text | 포스트 설명        |
| Slug        | rich_text | URL slug           |
| Category    | select    | 카테고리           |
| Date        | date      | 작성일             |
| isPublished | checkbox  | 게시 여부 (prod용) |

#### 2. Notion Integration 생성

1. [Notion Integrations](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. Database에 Integration 연결 (Share → Invite)
3. Internal Integration Secret 복사

#### 3. 환경 변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열고 값을 입력하세요:

```
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_database_id_here
```

#### 4. 설치 및 실행

```bash
pnpm install
pnpm dev
```

### 커스터마이징

#### 사이트 설정

`site.config.ts`에서 블로그 기본 정보를 수정하세요:

```ts
export const siteConfig = {
  blogName: 'My Blog',
  author: 'Your Name',
  homeTitle: 'My Blog',
  seoDefaultDesc: 'A blog powered by Notion',
  url: 'https://your-domain.com',
  github: '',
  mail: '',
};
```

#### 테마 색상

`src/assets/styles/index.css`에서 CSS 변수를 수정하여 테마를 커스터마이징할 수 있습니다.

#### 폰트

기본적으로 시스템 폰트를 사용합니다. 커스텀 폰트를 사용하려면 `src/assets/styles/index.css`의 `font-family`를 수정하세요.

### 기능

- 카테고리 필터링
- 무한 스크롤
- 다크 모드 (Light / Dark / System)
- 이미지 blur placeholder
- Table of Contents
- RSS 피드 (`/rss.xml`)
- 사이트맵 (`/sitemap.xml`)
- SEO 메타데이터 (OpenGraph, Twitter Card)
- 반응형 디자인

### 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/01-binary/notion-to-jsx-template)

Vercel에 배포할 때 Environment Variables에 `NOTION_TOKEN`, `NOTION_DATABASE_ID`를 설정하세요.

---

## Project Structure

```
app/
├── (home)/              # Homepage (post list)
├── posts/[slug]/        # Post detail page
├── rss.xml/             # RSS feed
├── sitemap.xml/         # Sitemap
├── _components/         # Shared components (Header, Footer, Theme)
├── _providers/          # Context Providers
├── layout.tsx           # Root layout
├── error.tsx            # Error page
└── not-found.tsx        # 404 page

src/
├── assets/styles/       # Global CSS
├── atoms/               # Jotai atoms
├── hooks/               # Shared hooks
├── interfaces/          # TypeScript types
├── lib/                 # Environment variables, dayjs, etc.
└── utils/               # Utility functions
```
