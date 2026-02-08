import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section
      className="
        flex h-[calc(100vh-128px-115px)] flex-col items-center justify-center
        gap-4 pb-[120px]
      "
    >
      <div className="text-[60px] font-bold">404</div>
      <div className="text-xl">Page not found</div>
      <Link
        href="/"
        className="
          mt-4 rounded-md bg-blue-500 px-4 py-2 text-white
          hover:bg-blue-600
        "
      >
        Go home
      </Link>
    </section>
  );
};

export default NotFoundPage;
