import type { AxiosResponse } from 'axios';

import type { ILicensesParams } from './ILicensesParamsTypes';
import { Operators } from '../../../../@types/serviceTypes';
import { searchSelectField } from './ILicensesParamsTypes';

import { request } from '../../../../services/requestService';

import { licensesSearchRestrictionsGenerator } from '../../helpers';
import { SortDirection } from '../../../../constatnts';
import { LPCO_ADMIN_SERVER } from '../../../../config';

export const getLicenses = ({
  offset,
  limit,
  selectFields,
  statusValues,
  lpcoTypeValue,
  statusValue = '',
}: ILicensesParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'lpco/search',
    data: {
      offset,
      max: limit,
      sortByFields: { [searchSelectField.lastOperationDate]: SortDirection.DESC },
      selectFields,
      restrictBy: 'AND',
      restrictions: licensesSearchRestrictionsGenerator(statusValues, lpcoTypeValue, statusValue),
    },
  });

export const getLicenseTypes = ({ licenseTypeValue = '' }: { licenseTypeValue?: string }): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    baseURL: LPCO_ADMIN_SERVER,
    url: 'licenseType/search',
    data: {
      offset: 0,
      max: 10,
      selectFields: ['licenseTypeCode', 'licenseTypeName'],
      distinct: true,
      restrictBy: 'AND',
      restrictions: [
        {
          field: 'licenseTypeCode',
          value: licenseTypeValue,
          operator: Operators.STARTS_WITH,
        },
      ],
    },
  });
