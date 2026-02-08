import { type GetPageResponse, type PageObjectResponse } from 'notion-to-utils';

export type { GetPageResponse, PageObjectResponse };

export interface SelectPropertyResponse {
  id: string;
  name: string;
  color: string;
}

export type PageProperties = PageObjectResponse['properties'][string];

export interface PostMeta {
  id: string;
  cover: string;
  icon: PageObjectResponse['icon'];
  category: Category;
  published: string;
  description: string;
  title: string;
  slug: string;
  blurImage?: string;
}

export interface Category extends SelectPropertyResponse {
  count?: number;
}
