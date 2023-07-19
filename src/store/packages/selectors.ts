import type { RootState } from '../index';

export const packagesSelector = (state: RootState) => state.packages.data;
