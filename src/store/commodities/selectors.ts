import type { RootState } from '../index';

export const commoditiesSelector = (state: RootState) => state.commodities.data;
