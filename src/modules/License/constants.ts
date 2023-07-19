export const SINGLEOPTION = 'SINGLE';
export const MULTIPLEOPTION = 'MULTIPLE';

export enum TypeOfUse {
  SINGLE = 'Single Use',
  MULTIPLE = 'Multiple Use',
}

export enum QuotaType {
  UOM = 'UOM',
  VALUE = 'VALUE',
  NET_MASS = 'NET_MASS',
  GROSS_MASS = 'GROSS_MASS',
  UNLIMITED = 'UNLIMITED',
  TAX = 'TAX',
}

export enum FileTypes {
  JPG = 'JPG',
  JPEG = 'JPEG',
  PNG = 'PNG',
  GIF = 'GIF',
  XSLS = 'XSLS',
  PDF = 'PDF',
}

export enum OperationTypes {
  STORE = 'Store',
  UPDATE_STORE = 'Ubdate Store',
  REQUEST = 'Request',
  SUBMIT_QUERIED = 'Submit Queried',
  UPDATE_QUERIED = 'Update Queried',
  DELETE = 'Delete',
  CANCEL = 'Cancel',
  CANCEL_APPROVED = 'Cancel Approved',
  CANCEL_PARTIALLY_APPROVED = 'Cancel Partially Approved',
  REJECT = 'Reject',
  QUERY = 'Query',
  RETURN = 'Return',
  SUSPEND = 'Suspend',
  ACTIVATE = 'Activate',
  OGA_UPDATE = 'Oga Update',
  UPDATE_APPROVED = 'Update Approved',
  EXTEND = 'Extend',
  REQUEST_EXTENSION = 'Request Extension',
  MANUAL_PAYMENT = 'Manual Payment',
  EXPIRE = 'Expire',
  UPDATE_BILL_NUMBER = 'Update Bill Number',
  REMOTE_PAY = 'Remote Pay',
  APPROVE = 'Approve',
}

export const statusesDepandsOperation = {
  STORE: 'stored',
  UPDATE_STORE: 'updated',
  REQUEST: 'requested',
  SUBMIT_QUERIED: 'submitted',
  UPDATE_QUERIED: 'updated',
  DELETE: 'deleted',
  CANCEL: 'canceled',
  CANCEL_APPROVED: 'canceled',
  CANCEL_PARTIALLY_APPROVED: 'canceled',
  REJECT: 'rejected',
  QUERY: 'queried',
  RETURN: 'returned',
  SUSPEND: 'suspended',
  ACTIVATE: 'activated',
  OGA_UPDATE: 'approved',
  EXTEND: 'extended',
  REQUEST_EXTENSION: 'requested',
  MANUAL_PAYMENT: 'paid',
  EXPIRE: 'expired',
  UPDATE_BILL_NUMBER: 'updated',
  REMOTE_PAY: 'paid',
  APPROVE: 'approved',
};

export const OGA_UPDATE = 'OGA_UPDATE';

export const attDocUploadSupportedFileTypes = [FileTypes.PDF, FileTypes.XSLS, FileTypes.JPEG];

export const attDocUploadSupportedMaxFileSize = '2MB';

export const attDocumentFile = 'attDocumentFile';

export enum QuotaTypeLabels {
  UOM = 'UOM',
  VALUE = 'Value',
  NET_MASS = 'Net Mass',
  GROSS_MASS = 'Gross Mass',
  UNLIMITED = 'Unlimited',
  TAX = 'Tax',
}
