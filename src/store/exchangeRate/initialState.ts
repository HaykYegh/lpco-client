import { exchangeRateAdapter } from './exchangeRateAdapter';

import type { ExchangeRateState } from './types';

export const initialState: ExchangeRateState = {
  data: exchangeRateAdapter.getInitialState(),
};
