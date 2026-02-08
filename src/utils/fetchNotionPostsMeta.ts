import { cacheLife, cacheTag } from 'next/cache';
import type { GetPageResponse } from 'notion-to-utils';

import type { PostMeta } from '@/interfaces';
import { env } from '@/lib/env';
import notionClient from '@/utils/notionClient';

import getPostsMeta from './getPostsMeta';

const createPostsQueryOptions = () => {
  const filter =
    process.env.NODE_ENV === 'production'
      ? {
          and: [
            { property: 'isPublished', checkbox: { equals: true } },
            { property: 'Slug', rich_text: { is_not_empty: true } },
          ],
        }
      : { property: 'Slug', rich_text: { is_not_empty: true } };

  const sorts = [{ property: 'Date', direction: 'descending' as const }];

  return { filter, sorts };
};

export async function fetchNotionPostsMeta(databaseId: string): Promise<GetPageResponse[]> {
  const response = await notionClient.dataSources.query({
    data_source_id: databaseId,
    ...createPostsQueryOptions(),
  } as Parameters<typeof notionClient.dataSources.query>[0]);

  return response.results as GetPageResponse[];
}

export async function getCachedPostsMeta(): Promise<PostMeta[]> {
  'use cache';
  cacheTag('posts');
  cacheLife('minutes');

  const response = await notionClient.dataSources.query({
    data_source_id: env.notionDatabaseId,
    ...createPostsQueryOptions(),
  } as Parameters<typeof notionClient.dataSources.query>[0]);

  const notionPostsResponse = response.results as GetPageResponse[];
  return getPostsMeta(notionPostsResponse);
}
