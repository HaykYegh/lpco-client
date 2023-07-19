import { createAction } from '@reduxjs/toolkit';

import type { GetDeclarantsApiPayload } from './types';

export const getDeclarantsApi = createAction<GetDeclarantsApiPayload>('getDeclarantsApi');
