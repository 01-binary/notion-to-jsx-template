'use client';

import { useSetAtom, useStore } from 'jotai';
import { RESET } from 'jotai/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { postPageResettableAtom, selectedCategoryAtom } from '../_atoms';
import { INITIAL_CATEGORY } from '../_constants';

const useCategoryQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const store = useStore();

  const setSelectedCategory = useSetAtom(selectedCategoryAtom);
  const setPostPage = useSetAtom(postPageResettableAtom);

  useEffect(() => {
    if (searchParams === null) return;
    const categoryFromQuery = searchParams.get('category');
    setSelectedCategory(categoryFromQuery || INITIAL_CATEGORY);
  }, [searchParams, setSelectedCategory]);

  const handleClickCategory = (target: string) => {
    const currentCategory = store.get(selectedCategoryAtom);
    if (currentCategory === target) return;

    const currentQuery = new URLSearchParams(Array.from(searchParams.entries()));

    if (target === INITIAL_CATEGORY) {
      currentQuery.delete('category');
    } else {
      currentQuery.set('category', target);
    }

    const queryString = currentQuery.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`);
    setPostPage(RESET);
  };

  return { handleClickCategory };
};

export default useCategoryQueryParam;
