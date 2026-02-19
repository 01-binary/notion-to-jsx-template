import { siteConfig } from 'site.config';

export interface PostSEOData {
  title: string;
  description: string;
  keywords: string;
  coverUrl: string;
  published: string;
}

interface NotionPageProperties {
  Name?: string;
  Desc?: string;
  Category?: { name?: string };
  Date?: { start?: string | null };
  coverUrl?: string;
}

const isNotionPageProperties = (obj: unknown): obj is NotionPageProperties => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const record = obj as Record<string, unknown>;

  if ('Name' in record && typeof record.Name !== 'string') {
    return false;
  }

  if ('Desc' in record && typeof record.Desc !== 'string') {
    return false;
  }

  return true;
};

export const extractPostMetadata = (
  properties: unknown,
  defaultTitle: string = 'Post',
): PostSEOData => {
  if (!isNotionPageProperties(properties)) {
    return {
      title: defaultTitle,
      description: siteConfig.seoDefaultDesc,
      keywords: '',
      coverUrl: '',
      published: '',
    };
  }

  return {
    title: properties.Name || defaultTitle,
    description: properties.Desc || siteConfig.seoDefaultDesc,
    keywords: properties.Category?.name || '',
    coverUrl: properties.coverUrl || '',
    published: properties.Date?.start || '',
  };
};
