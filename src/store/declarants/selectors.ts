import type { RootState } from '../index';

export const declarantsSelector = (state: RootState) => state.declarants.data;
