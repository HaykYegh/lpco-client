import { createSlice, type EntityId, type PayloadAction, type Update } from '@reduxjs/toolkit';

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
import { pushDefaultLpcoData } from '../utils/pushDefaultLpcoData';
import type { ISubDocs } from '../../../store/licenseType/types';
import { setItemsErrors } from '../utils/setItemsErrors';
import { initialState } from './initialState';

import type {
  IAttDocument,
  IBeneficiaryItem,
  IFeesItem,
  IItemsErrors,
  IItemsItem,
  IlicenseProps,
  IOperationFields,
  IOperationItem,
  LicenseState,
} from './types';

export const license = createSlice({
  name: 'license',
  initialState,
  reducers: {
    setLicensePropsById: (state: LicenseState, { payload }: PayloadAction<IlicenseProps>) => {
      state.licenseProps = payload;
    },

    setLicenseUserReferenceNumber: (state: LicenseState, { payload }: PayloadAction<string>) => {
      state.licenseProps.userReferenceNumber = payload;
    },

    setOperationsSubDocs: (state: LicenseState, { payload }: PayloadAction<ISubDocs>) => {
      state.subDocs = payload;
    },

    setLicenseItems: (state: LicenseState, { payload }: PayloadAction<Array<IItemsItem>>) => {
      itemsAdapter.setAll(state.items, payload);
    },

    setLicenseItemsWithErrors: (state: LicenseState, { payload }: PayloadAction<Array<IItemsItem>>) => {
      itemsWithErrorsAdapter.setAll(state.itemsWithErrors, payload);
    },

    addLicenseItem: (state: LicenseState, { payload }: PayloadAction<IItemsItem>) => {
      itemsAdapter.addOne(state.items, payload);
    },

    removeLicenseItem: (state: LicenseState, { payload }: PayloadAction<EntityId>) => {
      itemsAdapter.removeOne(state.items, payload);
    },

    removeLicenseItems: (state: LicenseState, { payload }: PayloadAction<Array<EntityId>>) => {
      itemsAdapter.removeMany(state.items, payload);
    },

    setLicenseItemsErrors: (state: LicenseState, { payload }: PayloadAction<IItemsErrors>) => {
      setItemsErrors(state, payload);
    },

    getDefaultLpcoData: (state: LicenseState) => {
      pushDefaultLpcoData(state);
    },

    removeLicenseItemWithErrors: (state: LicenseState, { payload }: PayloadAction<EntityId>) => {
      itemsWithErrorsAdapter.removeOne(state.itemsWithErrors, payload);
    },

    updateLicenseItem: (state: LicenseState, { payload }: PayloadAction<Update<IItemsItem>>) => {
      itemsAdapter.updateOne(state.items, payload);
    },

    setLicenseAttachedDocuments: (state: LicenseState, { payload }: PayloadAction<Array<IAttDocument>>) => {
      attDocumentsAdapter.setAll(state.attachedDocuments, payload);
    },

    setLicenseAttachedDocumentsWithErrors: (state: LicenseState, { payload }: PayloadAction<Array<IAttDocument>>) => {
      attDocumentsWithErrorsAdapter.setAll(state.attachedDocumentsWithErrors, payload);
    },

    addLicenseAttachedDocument: (state: LicenseState, { payload }: PayloadAction<IAttDocument>) => {
      attDocumentsAdapter.addOne(state.attachedDocuments, payload);
    },

    removeLicenseAttachedDocument: (state: LicenseState, { payload }: PayloadAction<EntityId>) => {
      attDocumentsAdapter.removeOne(state.attachedDocuments, payload);
    },

    removeLicenseAttachedDocuments: (state: LicenseState, { payload }: PayloadAction<Array<EntityId>>) => {
      attDocumentsAdapter.removeMany(state.attachedDocuments, payload);
    },

    removeLicenseAttachedDocumentWithErrors: (state: LicenseState, { payload }: PayloadAction<EntityId>) => {
      attDocumentsWithErrorsAdapter.removeOne(state.attachedDocumentsWithErrors, payload);
    },

    updateLicenseAttachedDocument: (state: LicenseState, { payload }: PayloadAction<Update<IAttDocument>>) => {
      attDocumentsAdapter.updateOne(state.attachedDocuments, payload);
    },

    setLicenseBeneficiaries: (state: LicenseState, { payload }: PayloadAction<Array<IBeneficiaryItem>>) => {
      beneficiariesAdapter.setAll(state.beneficiaries, payload);
    },

    removeLicenseBeneficiaries: (state: LicenseState, { payload }: PayloadAction<Array<EntityId>>) => {
      beneficiariesAdapter.removeMany(state.beneficiaries, payload);
    },

    setLicenseBeneficiariesWithErrors: (state: LicenseState, { payload }: PayloadAction<Array<IBeneficiaryItem>>) => {
      beneficiariesWithErrorsAdapter.setAll(state.beneficiariesWithErrors, payload);
    },

    addLicenseBeneficiary: (state: LicenseState, { payload }: PayloadAction<IBeneficiaryItem>) => {
      beneficiariesAdapter.addOne(state.beneficiaries, payload);
    },

    removeLicenseBeneficiary: (state: LicenseState, { payload }: PayloadAction<EntityId>) => {
      beneficiariesAdapter.removeOne(state.beneficiaries, payload);
    },

    removeLicenseBeneficiaryWithErrors: (state: LicenseState, { payload }: PayloadAction<EntityId>) => {
      beneficiariesWithErrorsAdapter.removeOne(state.beneficiariesWithErrors, payload);
    },

    updateLicenseBeneficiary: (state: LicenseState, { payload }: PayloadAction<Update<IBeneficiaryItem>>) => {
      beneficiariesAdapter.updateOne(state.beneficiaries, payload);
    },

    setLicenseFees: (state: LicenseState, { payload }: PayloadAction<Array<IFeesItem>>) => {
      lFeesAdapter.setAll(state.fees, payload);
    },

    setOperations: (state: LicenseState, { payload }: PayloadAction<Array<IOperationItem>>) => {
      operationsAdapter.setAll(state.operations, payload);
    },

    setEditableFields: (state: LicenseState, { payload }: PayloadAction<IOperationFields>) => {
      state.editableFields = payload;
    },

    setMandatoryFields: (state: LicenseState, { payload }: PayloadAction<IOperationFields>) => {
      state.mandatoryFields = payload;
    },
  },
});

export const {
  setLicensePropsById,
  setLicenseUserReferenceNumber,
  setLicenseItems,
  addLicenseItem,
  setOperationsSubDocs,
  removeLicenseItem,
  removeLicenseItems,
  updateLicenseItem,
  setLicenseAttachedDocuments,
  addLicenseAttachedDocument,
  removeLicenseAttachedDocument,
  removeLicenseAttachedDocuments,
  updateLicenseAttachedDocument,
  setLicenseBeneficiaries,
  removeLicenseBeneficiaries,
  addLicenseBeneficiary,
  removeLicenseBeneficiary,
  updateLicenseBeneficiary,
  setLicenseFees,
  setOperations,
  setEditableFields,
  setMandatoryFields,
  setLicenseItemsErrors,
  setLicenseBeneficiariesWithErrors,
  removeLicenseBeneficiaryWithErrors,
  setLicenseAttachedDocumentsWithErrors,
  removeLicenseAttachedDocumentWithErrors,
  setLicenseItemsWithErrors,
  removeLicenseItemWithErrors,
  getDefaultLpcoData,
} = license.actions;
