import type { Metadata } from 'next';

interface SocialMetadataOptions {
  imageUrl?: string;
  pageUrl?: string;
}

export const buildSocialMetadata = ({
  imageUrl,
  pageUrl,
}: SocialMetadataOptions): Pick<Metadata, 'openGraph' | 'twitter'> => {
  return {
    openGraph: {
      ...(imageUrl && { images: [{ url: imageUrl }] }),
      ...(pageUrl && { url: pageUrl }),
    },
    twitter: {
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
};
