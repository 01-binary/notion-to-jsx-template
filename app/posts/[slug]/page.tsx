import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import type { NotionBlock } from 'notion-to-utils';
import { cache } from 'react';
import { siteConfig } from 'site.config';

import { env } from '@/lib/env';
import { buildSocialMetadata } from '@/utils/buildSocialMetadata';
import { getCachedPostsMeta } from '@/utils/fetchNotionPostsMeta';
import notionClient from '@/utils/notionClient';

import PostRenderer from './_components/PostRenderer';
import {
  extractPostMetadata,
  getCachedIdBySlug,
  getCachedPageProperties,
  type PostSEOData,
} from './_utils';

const getPostId = cache((slug: string) => getCachedIdBySlug(slug, env.notionDatabaseId));

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getCachedPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const id = await getPostId(slug);

    if (!id) {
      return {
        title: 'Not Found',
        description: 'This post could not be found.',
      };
    }

    const properties = await getCachedPageProperties(id);
    const seo = extractPostMetadata(properties);
    const pageUrl = `${siteConfig.url}/posts/${slug}`;

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: { canonical: pageUrl },
      ...buildSocialMetadata({ imageUrl: seo.coverUrl, pageUrl }),
    };
  } catch (error) {
    console.error(`Error fetching metadata for slug ${slug}:`, error);
    return {
      title: 'Not Found',
      description: 'This post could not be found.',
    };
  }
}

type FetchPostDataResult =
  | { status: 'success'; blocks: NotionBlock[]; seo: PostSEOData }
  | { status: 'not_found' }
  | { status: 'error'; message: string };

async function fetchPostData(slug: string): Promise<FetchPostDataResult> {
  'use cache';
  cacheTag('post', slug);
  cacheLife('daysForever');

  try {
    const id = await getPostId(slug);

    if (!id) {
      return { status: 'not_found' };
    }

    const [blocks, properties] = await Promise.all([
      notionClient.getPageBlocks(id),
      getCachedPageProperties(id),
    ]);

    if (!blocks || blocks.length === 0) {
      return { status: 'not_found' };
    }

    return {
      status: 'success',
      blocks,
      seo: extractPostMetadata(properties, ''),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error fetching post data for slug ${slug}:`, error);
    return { status: 'error', message };
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;

  const result = await fetchPostData(slug);

  if (result.status !== 'success') {
    notFound();
  }

  const { blocks, seo } = result;

  return (
    <article>
      <PostRenderer
        blocks={blocks}
        title={seo.title}
        cover={seo.coverUrl}
      />
    </article>
  );
};

export default PostPage;
