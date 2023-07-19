import { searchSelectField } from './services/licensesApiService/ILicensesParamsTypes';

import { StatusesList } from './store/types';

export const lpcoListStatusesConfigs = {
  [StatusesList.STORED]: true,
  [StatusesList.DELETED]: true,
  [StatusesList.APPROVED]: true,
  [StatusesList.PARTIALLY_USED]: true,
  [StatusesList.USED]: true,
  [StatusesList.SUSPENDED]: true,
  [StatusesList.EXPIRED]: true,
  [StatusesList.REJECTED]: true,
  [StatusesList.CANCELED]: true,
  [StatusesList.GENERATE]: true,
  [StatusesList.PENDING_PAYMENT]: false,
  [StatusesList.REQUESTED]: false,
  [StatusesList.QUERIED]: false,
};

export const lpcoNReqSearchSelectFields = [searchSelectField.id, searchSelectField.licenseType];
export const lpcoListSearchSelectFields = [...lpcoNReqSearchSelectFields, searchSelectField.status];
export const lpcoSelectFields = [
  ...lpcoListSearchSelectFields,
  searchSelectField.userReferenceNumber,
  searchSelectField.approvalReference,
  searchSelectField.approvalDate,
  searchSelectField.companyCode,
  searchSelectField.lastOperationDate,
];

export const statusesConfigs = {
  STORED: true,
  DELETED: true,
  APPROVED: true,
  PARTIALLY_USED: true,
  USED: true,
  SUSPENDED: true,
  EXPIRED: true,
  REJECTED: true,
  CANCELED: true,
  GENERATE: true,
  PENDING_PAYMENT: false,
  REQUESTED: false,
  QUERIED: false,
};
