import { extractCoverUrl, type ExtractedValue, extractValuesFromProperties } from 'notion-to-utils';

import type { Category, GetPageResponse, PostMeta } from '@/interfaces';
import dayjs from '@/lib/dayjs';

type ExtractedDate = { start: string | null; end: string | null; time_zone: string | null };

const DEFAULT_CATEGORY: Category = { id: '', name: '', color: 'default' };

const formatDate = (date: ExtractedValue): string => {
  if (!date || typeof date !== 'object' || !('start' in date)) return '';
  return (date as ExtractedDate).start ? dayjs((date as ExtractedDate).start).format('LL') : '';
};

const getPostsMeta = (notionPostsResponse: GetPageResponse[]) => {
  const postsMeta = notionPostsResponse.reduce<PostMeta[]>((acc, item) => {
    if (!('properties' in item)) return acc;
    const { id, icon, cover, properties } = item;

    const extracted = extractValuesFromProperties(properties);

    const postMeta: PostMeta = {
      id,
      icon,
      cover: extractCoverUrl(cover, id),
      title: (extracted.Name as string) || '',
      description: (extracted.Desc as string) || '',
      slug: (extracted.Slug as string) || '',
      category: (extracted.Category as Category) || DEFAULT_CATEGORY,
      published: formatDate(extracted.Date),
    };

    return [...acc, postMeta];
  }, []);

  return postsMeta;
};

export default getPostsMeta;
