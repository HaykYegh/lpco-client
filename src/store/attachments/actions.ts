import { createAction } from '@reduxjs/toolkit';

import type { GetAttachmentsApiPayload } from './types';

export const getAttachmentsApi = createAction<GetAttachmentsApiPayload>('getAttachmentsApi');
