import type { AxiosResponse } from 'axios';

import type { ILicenseTypeByCodeParams } from './licenseTypeApiServiceTypes';

import { request } from '../requestService';

export const getLicenseTypeByCode = ({
  withId = false,
  licenseTypeCode,
}: ILicenseTypeByCodeParams): Promise<AxiosResponse> =>
  request({
    method: 'GET',
    url: withId ? `licenseType/getById/${licenseTypeCode}` : `licenseType/${licenseTypeCode}`,
  });
