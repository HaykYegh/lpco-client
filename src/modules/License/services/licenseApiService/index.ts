import type { AxiosResponse } from 'axios';

import { request } from '../../../../services/requestService';

interface IOperationParams {
  operation: string;
  data: Record<string, any>;
  id?: string;
}

export const getLicense = ({ id }: { id: number }): Promise<AxiosResponse> =>
  request({
    method: 'GET',
    url: `lpco/formDetails/${id}`,
  });

export const getUserReferenceNumber = (): Promise<AxiosResponse> =>
  request({
    method: 'GET',
    url: 'lpco/userRefNumber',
  });

export const sendOperation = ({ operation, data }: IOperationParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: `lpco/${operation}`,
    data,
  });

export const editOperation = ({ operation, data, id }: IOperationParams): Promise<AxiosResponse> =>
  request({
    method: 'PUT',
    url: `lpco/${operation}/${id as string}`,
    data,
  });
