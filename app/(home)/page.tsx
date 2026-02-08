import { Suspense } from 'react';

import CategoryListServer from './_components/CategoryListServer';
import CategoryListSkeleton from './_components/CategoryListSkeleton';
import PostListServer from './_components/PostListServer';
import PostListSkeleton from './_components/PostListSkeleton';

const Page = () => {
  return (
    <section className="mx-auto max-w-[900px] px-4">
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryListServer />
      </Suspense>
      <Suspense fallback={<PostListSkeleton />}>
        <PostListServer />
      </Suspense>
    </section>
  );
};

export default Page;
