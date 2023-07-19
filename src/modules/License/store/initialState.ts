import {
  attDocumentsAdapter,
  attDocumentsWithErrorsAdapter,
  beneficiariesAdapter,
  beneficiariesWithErrorsAdapter,
  itemsAdapter,
  itemsWithErrorsAdapter,
  lFeesAdapter,
  operationsAdapter,
} from './entityAdapters';

import { SINGLEOPTION } from '../constants';

import type { IlicenseProps, LicenseState } from './types';

export const defaultLicense: IlicenseProps = {
  id: null,
  licenseTypeId: null,
  licenseType: '',
  userReferenceNumber: '',
  requestNumber: '',
  requestDate: null,
  approvalReference: '',
  approvalDate: null,
  validFrom: null,
  validTo: null,
  status: '',
  countryOfDestinationCode: '',
  countryOfDestinationName: '',
  placeOfLoadingCode: null,
  placeOfLoadingName: null,
  placeOfUnloadingCode: '',
  placeOfUnloadingName: '',
  typeOfUse: SINGLEOPTION,
  companyCode: '',
  companyDescription: '',
  companyAddress: '',
  companyPhone: '',
  companyEmail: '',
  invoiceCurrencyCode: '',
  invoiceCurrencyName: '',
  invoiceExchangeRate: null,
  invoiceAmountInNationalCurrency: null,
  invoiceAmountInForeignCurrency: null,
  termsOfDeliveryCode: '',
  termsOfDeliveryDescription: '',
  declarantCode: '',
  declarantName: '',
  ministryCode: '',
  departmentCode: '',
  totalAmount: 0,
  amountToBePaid: 0,
  relatedProducts: null,
  flow: null,
};

export const defaultSubDocs = {
  attachedDocuments: {
    add: false,
    delete: false,
    modify: false,
  },
  beneficiaries: {
    add: false,
    delete: false,
    modify: false,
  },
  fees: {
    add: false,
    delete: false,
    modify: false,
  },
  items: {
    add: false,
    delete: false,
    modify: false,
  },
};

export const initialState: LicenseState = {
  licenseProps: defaultLicense,
  items: itemsAdapter.getInitialState(),
  attachedDocuments: attDocumentsAdapter.getInitialState(),
  beneficiaries: beneficiariesAdapter.getInitialState(),
  itemsWithErrors: itemsWithErrorsAdapter.getInitialState(),
  attachedDocumentsWithErrors: attDocumentsWithErrorsAdapter.getInitialState(),
  beneficiariesWithErrors: beneficiariesWithErrorsAdapter.getInitialState(),
  fees: lFeesAdapter.getInitialState(),
  operations: operationsAdapter.getInitialState(),
  editableFields: { entities: {}, ids: [] },
  mandatoryFields: { entities: {}, ids: [] },
  subDocs: defaultSubDocs,
};
