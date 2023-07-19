import type { AxiosResponse } from 'axios';

import { request } from '../../../../services/requestService';

export const getDocumentHistory = ({ documentId }: { documentId: string }): Promise<AxiosResponse> =>
  request({
    method: 'GET',
    url: `audit/versions/${documentId}`,
  });
