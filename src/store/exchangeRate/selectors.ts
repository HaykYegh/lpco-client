import type { RootState } from '../index';

export const exchangeRateDataSelector = (state: RootState) => state.exchangeRate.data;
