import { createAction } from '@reduxjs/toolkit';

import type { GetCustomsOfficeApiPayload } from './types';

export const getCustomsOfficeApi = createAction<GetCustomsOfficeApiPayload>('getCustomsOfficeApi');
