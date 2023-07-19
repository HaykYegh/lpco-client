import type { Dictionary, Draft, EntityId } from '@reduxjs/toolkit';
import type { UseFormReturn } from 'react-hook-form';

import type { setFeesActionName, setFeesForEditActionName } from './actions';

export type LicenseTypeState = {
  licenseTypeByCode: ILicenseTypeByCodeProps;
  licenseTypeFeatureFlagsByCode: IFeatureFlagsProps;
  licenseTypeAprovalsByCode: IAprovalsEntityProps;
  licenseTypeApTransitionsByCode: IApTransitionsEntityProps;
  licenseTypeFeesByCode: IFeeEntityProps;
  licenseTypeFeesForExtendByCode: IFeeEntityProps;
  licenseTypeAttDocumentsByCode: IAttDocumentsEntityProps;
  licenseTypeAdditionalFieldsByCode: IAdditionalFieldEntityProps;
};

export type LicenseTypeStateWithDraft = LicenseTypeState | Draft<LicenseTypeState>;

export interface IAprovalsEntityProps {
  entities: Dictionary<IApprovalAdItem>;
  ids: EntityId[];
}

export interface IApTransitionsEntityProps {
  entities: Dictionary<ITransitionItem>;
  ids: EntityId[];
}

export interface IAttDocumentsEntityProps {
  entities: Dictionary<IAttachedDocumentItem>;
  ids: EntityId[];
}

export interface IFeeEntityProps {
  entities: Dictionary<IFeeItem>;
  ids: EntityId[];
}

export interface IAdditionalFieldEntityProps {
  entities: Dictionary<IAdditionalFieldItem>;
  ids: EntityId[];
}

export interface IAprovalsPayload {
  approvalsData: Array<IApprovalProps>;
  transitions: Array<ITransitionItem>;
}

export type GetLicenseTypesApiPayload = {
  limit: number;
  offset: number;
  licenseTypeCode?: string;
  productListCode?: string;
  date?: string;
};

export type GetLicenseTypeApiPayload = {
  licenseTypeCode: string;
  withOperations?: boolean;
  withId?: boolean;
};

export type SetLicenseTypeApiPayload = {
  licenseTypeByCodeParams: ILicenseTypeByCodeProps;
  featureFlags: IFeatureFlagsProps;
  transitions: ITransitionItem[];
  approvalsData: IApprovalProps[];
  attachedDocuments: IAttachedDocumentItem[];
  feesData: IFeeItem[];
  feesForExtendData: IFeeItem[];
};

export type LicenseFeesApiPayload = {
  feeCodeValue: string;
  actionName: typeof setFeesActionName | typeof setFeesForEditActionName;
};

export interface IUpdateLicenseTypeApiPayload extends IGetSendingDataPayload {
  id?: number;
}

export interface IGetSendingDataPayload {
  dataForm: Record<string, any>;
}

export type ItemPermissions = {
  add: boolean;
  delete: boolean;
  modify: boolean;
};

export interface ISubDocs {
  attachedDocuments: ItemPermissions;
  beneficiaries: ItemPermissions;
  fees: ItemPermissions;
  items: ItemPermissions;
}

export interface IConfigs {
  operations: Record<string, any>;
  subDocs: ISubDocs;
}

export interface ILType {
  configs: IConfigs;
  licenseTypeResponse: ILicenseTypeProps;
}

export interface ILicenseTypeProps extends ILicenseTypeByCodeProps {
  featureFlags?: IFeatureFlagsProps;
  approvals: Array<IApprovalItem>;
  fees?: unknown;
  attachedDocuments?: unknown;
  additionalFields?: unknown;
}

export interface ILicenseTypeByCodeProps {
  id?: number;
  licenseTypeCode: string;
  licenseTypeName?: string;
  licenseTypeNameInNationalLang?: string;
  licenseTypeNature?: string;
  applicationFeeMode: string;
  extensionFeeMode: string;
  dov?: string;
  eov?: string | null;
  ministryCode?: string;
  departmentCode?: string;
  tariffListCode: string;
  relatedProducts: string;
  flow: string;
  paymentFlow: string;
  typeOfUse: string;
  startDateValidityType: string;
  endDateValidityType: string;
  validityPeriod: number | null;
  noOfDaysBeforeValidFrom: number | null;
  noOfDaysBeforeValidTo: number | null;
  noOfAllowableExtension: number | null;
  maxNumOfDaysForExtension: number | null;
  quotaType: string;
  quotaTaxCode: string;
  enabledQuotas: Array<string>;
  printStatuses: Array<string>;
  sigAndStampsName: string | null;
  ltValidation?: boolean;
  ifValidation?: boolean;
  formErrorsArrLength?: number;
  form?: UseFormReturn;
}

export interface IFeatureFlagsProps {
  flowEnabled: boolean;
  relatedProductsEnabled: boolean;
  declarantEnabled: boolean;
  typeOfUseEnabled: boolean;
  countryOfExportOrImportEnabled: boolean;
  termOfDeliveryEnabled: boolean;
  placeOfLoadingEnabled: boolean;
  placeOfUnloadingEnabled: boolean;
  contactPersonEnabled: boolean;
  departmentOfficeEnabled: boolean;
  entryExitPointEnabled: boolean;
  listOfBeneficiariesEnabled: boolean;
  suspendOpEnabled: boolean;
  cancelOpEnabled: boolean;
  updateApproveOpEnabled: boolean;
  packageManagementTableEnabled: boolean;
  treatmentTableEnabled: boolean;
  hsCodeEnabled: boolean;
  extendBeforeExpirationEnabled: boolean;
  extendAfterExpirationEnabled: boolean;
  fixFee: boolean;
  fixFeeForExtend: boolean;
  packageManagementEnabled: boolean;
  invoiceValueManagementEnabled: boolean;
  itemWeightManagementEnabled: boolean;
  addItemOnQueriedEnabled: boolean;
  editItemOnQueriedEnabled: boolean;
  deleteItemOnQueriedEnabled: boolean;
  addItemOnOgaEditEnabled: boolean;
  editItemOnOgaEditEnabled: boolean;
  deleteItemOnOgaEditEnabled: boolean;
  requestedAndApprovedAmountEnabled: boolean;
  remainingAmountEnabled: boolean;
}

export interface ITransitionItem {
  id?: number;
  departmentLevel: number;
  operationName: string;
  operationNameInNationalLang: string;
  operationStatus: string;
  operationStatusInNationalLang: string;
  reRoute: null;
  isManualAssignment: boolean;
  isRejectOpEnabled: boolean;
}

export interface IApprovalProps {
  id?: number;
  rank: number;
  ministryCode: string;
  ministryName?: string;
  departmentCode: string;
  departmentName?: string;
  transitionsArr?: Array<number>;
  transitions?: Array<ITransitionItem>;
}

export interface IApprovalItem extends IApprovalProps {
  transitions: Array<ITransitionItem>;
}

export interface IApprovalAdItem extends IApprovalProps {
  transitionsArr?: Array<number>;
}

export interface IAttachedDocumentItem {
  code: string;
  description?: string;
  id?: number;
  isDateRequired: boolean;
  isReferenceRequired: boolean;
  tariffListCode: string;
}

export interface IFeeItem {
  id?: number;
  feeCode: string;
  feeDescription?: string;
  benCode?: string;
  benDescription?: string;
  amount: number;
  feeType: string;
}

export interface IAdditionalFieldItem {
  id?: number;
  parent: string;
  dataType: string;
  englishLabel: string;
  nationalLanguageLabel: string;
  config: string;
  englishPlaceHolder: string;
  nationalLanguagePlaceHolder: string;
  listOfOptions: string;
  fieldUILength: number;
  textAreaHeight: number;
  defaultValue: string;
  minLength: number;
  maxLength: number;
  minDate: number;
  maxDate: number;
}

export enum feeMode {
  NONE = 'NONE',
  CALCULATED = 'CALCULATED',
  FIXED = 'FIXED',
}

export enum licenseFeeTypes {
  APPLICATION_FEE = 'APPLICATION_FEE',
  EXTENSION_FEE = 'EXTENSION_FEE',
}
