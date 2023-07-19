import { createAction } from '@reduxjs/toolkit';

import type { GetExchangeRateApiPayload } from './types';

export const getExchangeRateApi = createAction<GetExchangeRateApiPayload>('getExchangeRateApi');
