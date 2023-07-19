import { createAction } from '@reduxjs/toolkit';

import type { GetPackagesApiPayload } from './types';

export const getPackagesApi = createAction<GetPackagesApiPayload>('getPackagesApi');
