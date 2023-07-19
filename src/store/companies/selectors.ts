import type { RootState } from '../index';

export const companiesSelector = (state: RootState) => state.companies.data;
