import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import type { PostMeta } from '@/interfaces';

import { postPageResettableAtom, selectedCategoryAtom } from '../_atoms';
import { DEFAULT_PAGE_SIZE, INITIAL_CATEGORY } from '../_constants';

const useFilteredPagedPosts = (initialPosts: PostMeta[]): PostMeta[] => {
  const selectedCategory = useAtomValue(selectedCategoryAtom);
  const postPage = useAtomValue(postPageResettableAtom);

  const filteredPosts = useMemo(() => {
    return selectedCategory === INITIAL_CATEGORY
      ? initialPosts
      : initialPosts.filter((post) => post.category.name === selectedCategory);
  }, [initialPosts, selectedCategory]);

  return filteredPosts.slice(0, (postPage + 1) * DEFAULT_PAGE_SIZE);
};

export default useFilteredPagedPosts;
