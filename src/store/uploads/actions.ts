import { createAction } from '@reduxjs/toolkit';

import type { GetUploadParamsPayload } from './types';

export const getUploadParams = createAction<GetUploadParamsPayload>('getUploadParams');
