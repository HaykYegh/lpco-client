import type { RootState } from '../index';

export const countriesSelector = (state: RootState) => state.countries.data;
