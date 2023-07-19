import { createAction } from '@reduxjs/toolkit';

import type { GetCommoditiesApiPayload } from './types';

export const getCommoditiesApi = createAction<GetCommoditiesApiPayload>('getCommoditiesApi');
