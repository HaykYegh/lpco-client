import type {
  setLicensesDataActionName,
  setLicensesSearchDataActionName,
  setNewLicensesDataActionName,
  setNewLicensesSearchDataActionName,
} from './actions';

export type LicensesState = {
  newLicensesData: ILpcoSearchItem[];
  newLicensesLoading: boolean;
  newLicensesCount: number;
  licensesData: ILpcoSearchItem[];
  licensesLoading: boolean;
  licensesCount: number;
  newLicensesSearchData: GetLicenseTypeApiPayload[];
  licensesSearchData: GetLicenseTypeApiPayload[];
};

export interface ILpco extends ILpcoSearchItem {
  requestNumber: string;
  requestDate: string;
  validFrom: string;
  countryOfDestinationCode: string;
  countryOfDestinationName: string;
  placeOfLoadingCode: string;
  placeOfLoadingName: string;
  placeOfUnloadingCode: string;
  placeOfUnloadingName: string;
  companyDescription: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  invoiceCurrencyCode: string;
  invoiceCurrencyName: string;
  invoiceExchangeRate: number;
  invoiceAmountInNationalCurrency: number;
  invoiceAmountInForeignCurrency: number;
  termsOfDeliveryCode: string;
  termsOfDeliveryDescription: string;
  declarantCode: string;
  declarantName: string;
  ministryCode: string;
  departmentCode: string;
  items: IItemsItem[];
  attachedDocuments: IAttDocument[];
  beneficiaries: IBeneficaryItem[];
  fees: IFeesItem[];
  totalAmount: number;
  amountToBePaid: number;
}

export interface ILpcoSearchItem extends ILpcoSearchParamsItem {
  userReferenceNumber: string;
  approvalReference: string;
  approvalDate: string;
  companyCode: string;
}

export interface ILpcoSearchParamsItem {
  id: number;
  status: string;
  licenseType: string;
}

export interface IItemsItem {
  id: number;
  commodityCode: string;
  commodityDescription: string;
  commercialDescription: string;
  manufacturerName: string;
  countryOfOriginCode: string;
  countryOfOriginName: string;
  packageNumber: number;
  packageTypeCode: string;
  packageTypeName: string;
  packageMark: string;
  grossMass: number;
  netMass: number;
  quotaType: string;
}

export interface IAttDocument {
  id: number;
  code: string;
  name: string;
  referenceNumber: string;
  attachmentDate: string;
  fileUrl: string;
}

export interface IBeneficaryItem {
  id: number;
  code: string;
  description: string;
  phoneNumber: string;
  email: string;
}

export interface IFeesItem {
  id: number;
  feeCode: string;
  feeDescription: string;
  benCode: string;
  benDescription: string;
  value: number;
  amount: number;
  rate: number;
  receiptNumber: string;
  paymentDate: string;
}

export type actionNameType =
  | typeof setNewLicensesDataActionName
  | typeof setLicensesDataActionName
  | typeof setNewLicensesSearchDataActionName
  | typeof setLicensesSearchDataActionName;

export type GetLicensesApiPayload = {
  limit: number;
  offset: number;
  statusValue?: string;
  lpcoTypeValue?: string;
  statusValues: (keyof StatusesList)[];
  selectFields: string[];
};

export type GetLicenseTypeApiPayload = {
  licenseTypeValue: string;
};

export type LicensesType = {
  resultList: ILpcoSearchItem[];
  totalCount: number;
};

export type LicenseTypes = {
  resultList: GetLicenseTypeApiPayload[];
  totalCount: number;
};

export enum StatusesList {
  STORED = 'Stored',
  DELETED = 'Deleted',
  QUERIED = 'Queried',
  PENDING_PAYMENT = 'Pending Payment',
  REQUESTED = 'Requested',
  APPROVED = 'Approved',
  PARTIALLY_USED = 'Partially Used',
  USED = 'Used',
  SUSPENDED = 'Suspended',
  EXPIRED = 'Expired',
  REJECTED = 'Rejected',
  CANCELED = 'Canceled',
  GENERATE = 'Generate',
}
