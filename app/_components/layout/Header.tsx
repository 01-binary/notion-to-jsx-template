import Link from 'next/link';
import { siteConfig } from 'site.config';

import ThemeSelect from '../ThemeSelect';

const Header = () => {
  return (
    <>
      <header
        className="
          fixed top-0 z-50 w-full min-w-[360px] bg-[rgb(var(--color-header-bg))]
          backdrop-blur-lg
        "
      >
        <nav
          className="
            mx-auto flex max-w-(--breakpoint-lg) items-center justify-between
            p-3
          "
        >
          <h1 className="text-[20px] font-medium">
            <Link href={'/'}>{siteConfig.blogName}</Link>
          </h1>

          <ul className="flex items-center gap-2">
            <li>
              <ThemeSelect />
            </li>
          </ul>
        </nav>
      </header>
      <div className="h-[90px]" />
    </>
  );
};

export default Header;
