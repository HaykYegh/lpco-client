import { createAction } from '@reduxjs/toolkit';

import type { GetLicensesApiPayload, GetLicenseTypeApiPayload } from './types';

export const setNewLicensesDataActionName = 'setNewLicensesData';
export const setLicensesDataActionName = 'setLicensesData';
export const setNewLicensesSearchDataActionName = 'setNewLicensesSearchData';
export const setLicensesSearchDataActionName = 'setLicensesSearchData';

export const getLicensesApi = createAction<GetLicensesApiPayload>('getLicensesApi');
export const getNewLicensesApi = createAction<GetLicensesApiPayload>('getNewLicensesApi');
export const getLicenseTypesApi = createAction<GetLicenseTypeApiPayload>('getLicenseTypesApi');
