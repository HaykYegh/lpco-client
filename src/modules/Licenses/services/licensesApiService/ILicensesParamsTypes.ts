import type { StatusesList } from '../../store/types';

export interface ILicensesParams {
  offset: number;
  limit: number;
  selectFields: string[];
  statusValues: (keyof StatusesList)[];
  lpcoTypeValue: string;
  statusValue?: string;
}

export enum searchSelectField {
  id = 'id',
  status = 'status',
  licenseType = 'licenseType',
  userReferenceNumber = 'userReferenceNumber',
  approvalReference = 'approvalReference',
  approvalDate = 'approvalDate',
  companyCode = 'companyCode',
  lastOperationDate = 'lastOperationDate',
}
