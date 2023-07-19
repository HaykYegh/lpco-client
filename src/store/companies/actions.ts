import { createAction } from '@reduxjs/toolkit';

import type { GetCompaniesApiPayload } from './types';

export const getCompaniesApi = createAction<GetCompaniesApiPayload>('getCompaniesApi');
