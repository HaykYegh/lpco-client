import type { AxiosResponse } from 'axios';

import type { IRimmSearchServiceTypes } from './rimmSearchServiceTypes';

import { request } from '../requestService';

import { RIMM_SERVER } from '../../config';

export const rimmSearchService = ({
  type,
  offset = 0,
  max = 10,
  selectFields = ['code', 'description'],
  restrictBy = 'AND',
  restrictions,
}: IRimmSearchServiceTypes): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    baseURL: RIMM_SERVER,
    url: `${type}/search`,
    data: {
      offset,
      max,
      selectFields,
      distinct: true,
      restrictBy,
      restrictions,
    },
  });
