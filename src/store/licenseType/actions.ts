import { createAction } from '@reduxjs/toolkit';

import type { GetLicenseTypeApiPayload, SetLicenseTypeApiPayload } from './types';

export const setFeesActionName = 'setFees';
export const setFeesForEditActionName = 'setFeesForEdit';

export const getLicenseTypeByCodeApi = createAction<GetLicenseTypeApiPayload>('getLicenseTypeByCodeApi');
export const setLicenseType = createAction<SetLicenseTypeApiPayload>('setLicenseType');
