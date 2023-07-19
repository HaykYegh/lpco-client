import { createAction } from '@reduxjs/toolkit';

import type { ChangeOperationsPayload, GetLicenseApiPayload, SendLicensePayload } from './types';

export const getLicenseApi = createAction<GetLicenseApiPayload>('getLicenseApi');
export const changeOperations = createAction<ChangeOperationsPayload>('changeOperations');
export const getUserReferenceNumberApi = createAction('getUserReferenceNumberApi');
export const sendLicenseApi = createAction<SendLicensePayload>('sendLicenseApi');
