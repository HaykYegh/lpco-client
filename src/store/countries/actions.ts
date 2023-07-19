import { createAction } from '@reduxjs/toolkit';

import type { GetCountriesApiPayload } from './types';

export const getCountriesApi = createAction<GetCountriesApiPayload>('getCountriesApi');
