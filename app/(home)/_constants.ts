const BG_COLORS = {
  purple: 'bg-purple-200',
  yellow: 'bg-yellow-200',
  green: 'bg-green-200',
  blue: 'bg-blue-200',
  pink: 'bg-pink-200',
  brown: 'bg-stone-200',
  red: 'bg-red-200',
  orange: 'bg-orange-200',
  gray: 'bg-gray-200',
  default: 'bg-slate-200',
} as const;

const BORDER_COLORS = {
  purple: 'border-purple-200',
  yellow: 'border-yellow-200',
  green: 'border-green-200',
  blue: 'border-blue-200',
  pink: 'border-pink-200',
  brown: 'border-stone-200',
  red: 'border-red-200',
  orange: 'border-orange-200',
  gray: 'border-gray-200',
  default: 'border-slate-200',
} as const;

type CategoryColor = keyof typeof BG_COLORS;

export const getCategoryBgClass = (color: string | undefined): string =>
  BG_COLORS[color as CategoryColor] ?? BG_COLORS.default;

export const getCategoryBorderClass = (color: string | undefined): string =>
  BORDER_COLORS[color as CategoryColor] ?? BORDER_COLORS.default;

export const INITIAL_CATEGORY = 'All';

export const INITIAL_PAGE = 0;

export const DEFAULT_PAGE_SIZE = 8;

export const DEFAULT_BLUR_BASE64 =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4=';

export const SKELETON_BASE_CLASS = 'animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700';
