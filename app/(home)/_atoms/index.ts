import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { INITIAL_CATEGORY, INITIAL_PAGE } from '../_constants';

export const selectedCategoryAtom = atom<string>(INITIAL_CATEGORY);
export const postPageResettableAtom = atomWithReset<number>(INITIAL_PAGE);
