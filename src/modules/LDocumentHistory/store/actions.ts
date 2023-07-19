import { createAction } from '@reduxjs/toolkit';

import type { GetDocumentHistoryApiPayload } from './types';

export const getDocumentHistoryApi = createAction<GetDocumentHistoryApiPayload>('getDocumentHistoryApi');
