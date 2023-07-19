import type { Dictionary, EntityId } from '@reduxjs/toolkit';
import type { NavigateFunction } from 'react-router-dom';

import type { ISubDocs } from '../../../store/licenseType/types';

import { type QuotaTypeLabels } from '../constants';

export type LicenseState = {
  licenseProps: IlicenseProps;
  items: IItemsItemEntityProps;
  attachedDocuments: IAttDocumentEntityProps;
  beneficiaries: IBeneficiaryItemEntityProps;
  itemsWithErrors: IItemsItemEntityProps;
  attachedDocumentsWithErrors: IAttDocumentEntityProps;
  beneficiariesWithErrors: IBeneficiaryItemEntityProps;
  fees: IFeesItemEntityProps;
  operations: IOperationsEntityProps;
  editableFields: IOperationFields;
  mandatoryFields: IOperationFields;
  subDocs: ISubDocs;
};

export interface IItemsItemEntityProps {
  entities: Dictionary<IItemsItem>;
  ids: EntityId[];
}

export interface IAttDocumentEntityProps {
  entities: Dictionary<IAttDocument>;
  ids: EntityId[];
}

export interface IBeneficiaryItemEntityProps {
  entities: Dictionary<IBeneficiaryItem>;
  ids: EntityId[];
}

export interface IFeesItemEntityProps {
  entities: Dictionary<IFeesItem>;
  ids: EntityId[];
}

export interface IOperationsEntityProps {
  entities: Dictionary<IOperationItem>;
  ids: EntityId[];
}

export interface IItemsOperationFields {
  entities: Record<string, Record<string, ConfigFieldItem>>;
  ids: string[];
}

export interface IOperationFields {
  entities: Record<string, IItemsOperationFields>;
  ids: string[];
}

export enum licensePropsEnum {
  id = 'id',
  status = 'status',
  licenseType = 'licenseType',
  userReferenceNumber = 'userReferenceNumber',
  approvalReference = 'approvalReference',
  approvalDate = 'approvalDate',
  companyCode = 'companyCode',
  requestNumber = 'requestNumber',
  requestDate = 'requestDate',
  validFrom = 'validFrom',
  validTo = 'validTo',
  countryOfDestinationCode = 'countryOfDestinationCode',
  countryOfDestinationName = 'countryOfDestinationName',
  placeOfLoadingCode = 'placeOfLoadingCode',
  placeOfLoadingName = 'placeOfLoadingName',
  placeOfUnloadingCode = 'placeOfUnloadingCode',
  placeOfUnloadingName = 'placeOfUnloadingName',
  companyDescription = 'companyDescription',
  companyAddress = 'companyAddress',
  companyPhone = 'companyPhone',
  companyEmail = 'companyEmail',
  typeOfUse = 'typeOfUse',
  invoiceCurrencyCode = 'invoiceCurrencyCode',
  invoiceCurrencyName = 'invoiceCurrencyName',
  invoiceExchangeRate = 'invoiceExchangeRate',
  invoiceAmountInNationalCurrency = 'invoiceAmountInNationalCurrency',
  invoiceAmountInForeignCurrency = 'invoiceAmountInForeignCurrency',
  termsOfDeliveryCode = 'termsOfDeliveryCode',
  termsOfDeliveryDescription = 'termsOfDeliveryDescription',
  declarantCode = 'declarantCode',
  declarantName = 'declarantName',
  ministryCode = 'ministryCode',
  departmentCode = 'departmentCode',
  totalAmount = 'totalAmount',
  amountToBePaid = 'amountToBePaid',
  relatedProducts = 'relatedProducts',
  flow = 'flow',
}

export interface IlicenseProps {
  id?: Nullable<number>;
  status: string;
  licenseTypeId: Nullable<string>;
  licenseType: string;
  userReferenceNumber: string;
  approvalReference: Nullable<string>;
  approvalDate: Nullable<string>;
  companyCode: Nullable<string>;
  requestNumber: string;
  requestDate: Nullable<string>;
  validFrom: Nullable<string>;
  validTo: Nullable<string>;
  countryOfDestinationCode: string;
  countryOfDestinationName: string;
  placeOfLoadingCode: Nullable<string>;
  placeOfLoadingName: Nullable<string>;
  placeOfUnloadingCode: string;
  placeOfUnloadingName: string;
  typeOfUse: string;
  companyDescription: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  invoiceCurrencyCode: string;
  invoiceCurrencyName: string;
  invoiceExchangeRate: Nullable<number>;
  invoiceAmountInNationalCurrency: Nullable<number>;
  invoiceAmountInForeignCurrency: Nullable<number>;
  termsOfDeliveryCode: string;
  termsOfDeliveryDescription: string;
  declarantCode: string;
  declarantName: string;
  ministryCode: string;
  departmentCode: string;
  totalAmount: number;
  amountToBePaid: number;
  relatedProducts: Nullable<string>;
  flow: Nullable<string>;
}

export type ConfigFieldItem =
  | {
      field: string;
      type: string;
    }
  | Record<string, any>;

export interface IOperationItem {
  mandatoryFields: IItemsOperationFields;
  optionalFields: IItemsOperationFields;
  editableFields: IItemsOperationFields;
  smallestLengthMandatoryFields: Array<string>;
  smallestLengthMandatoryProp: string;
  name: string;
}

export interface IFieldConfigItem {
  field: string;
}

export type OperationConfig = {
  mandatoryFields: Array<string>;
  optionalFields: Array<string>;
};

export interface IConfiguration {
  operations: Record<string, OperationConfig>;
  subDocs: ISubDocs;
}

export interface ILpcoData {
  lpcoResponse: ILpco;
  configs: IConfiguration;
}

export interface ILpco extends IlicenseProps {
  items: IItemsItem[];
  attachedDocuments: IAttDocument[];
  beneficiaries: IBeneficiaryItem[];
  fees: IFeesItem[];
}

export interface IItemsItem {
  id?: number;
  commodityCode: string;
  commodityDescription: string;
  commercialDescription: string;
  manufacturerName: string;
  countryOfOriginCode: string;
  countryOfOriginName?: string;
  packageNumber?: number;
  packageTypeCode?: string;
  packageTypeName?: string;
  packageMark?: string;
  itemInvoiceAmountInForeignCurrency: number;
  itemInvoiceAmountInNationalCurrency: number;
  grossMass: number | null;
  netMass?: number;
  quotaType: keyof typeof QuotaTypeLabels;
}

export interface IAttDocument {
  id: number;
  code: string;
  name: string;
  referenceNumber: string;
  attachmentDate: string | null;
  fileUrl: string;
}

export interface IBeneficiaryItem {
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

export interface IOperation {
  mandatoryFields: IOperationFields;
  optionalFields: IOperationFields;
  editableFields: IOperationFields;
  smallestLengthMandatoryFields: Array<string>;
  smallestLengthMandatoryProp: string;
  name: string;
}

export interface IItemsErrors {
  beneficiariesWithErrors: IBeneficiaryItem[];
  beneficiariesIds: EntityId[];
  attachedDocumentsWithErrors: IAttDocument[];
  attachedDocumentsIds: EntityId[];
  itemsWithErrors: IItemsItem[];
  itemsIds: EntityId[];
}

export type GetLicenseApiPayload = {
  id: string;
};

export type ChangeOperationsPayload = {
  configs: Record<string, OperationConfig>;
};

export type SendLicensePayload = {
  operation: IOperation;
  licenseProps: Record<string, any>;
  navigate: NavigateFunction;
  id?: string;
};

export enum LicenseModeItems {
  view = 'view',
  edit = 'edit',
  create = 'create',
}

export enum ChangeMethods {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export enum OperationFields {
  MANDATORY = 'MANDATORY',
  OPTIONAL = 'OPTIONAL',
  PROHIBITED = 'PROHIBITED',
}
