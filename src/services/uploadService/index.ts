import type { AxiosResponse } from 'axios';

import { request } from '../requestService';

export const uploadService = ({ url, formData }: { url: string; formData: FormData }): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    transformRequest: (data) => data,
  });
