import type { RootState } from '../../../store';

export const licensePropsSelector = (state: RootState) => state.license.licenseProps;
export const licenseOperationsSelector = (state: RootState) => state.license.operations;
export const licenseSubDocsBeneficiariesSelector = (state: RootState) => state.license.subDocs.beneficiaries;
export const licenseSubDocsAttDocumentsSelector = (state: RootState) => state.license.subDocs.attachedDocuments;
export const licenseSubDocsItemsSelector = (state: RootState) => state.license.subDocs.items;
export const licenseSubDocsFeesSelector = (state: RootState) => state.license.subDocs.fees;
export const licenseMandatoryFieldsSelector = (state: RootState) => state.license.mandatoryFields.entities;
export const licensePropsMandatoryFieldsSelector = (state: RootState) => state.license.mandatoryFields.entities.lpco;
export const licenseBeneficiaryMandatoryFieldsSelector = (state: RootState) =>
  state.license.mandatoryFields.entities.beneficiary;
export const licenseItemMandatoryFieldsSelector = (state: RootState) => state.license.mandatoryFields.entities.item;
export const licenseAttDocumentMandatoryFieldsSelector = (state: RootState) =>
  state.license.mandatoryFields.entities.attached_document;
export const licenseEditableFieldsSelector = (state: RootState) => state.license.editableFields.entities;
export const licensePropsEditableFieldsSelector = (state: RootState) => state.license.editableFields.entities.lpco;
export const licenseBeneficiaryEditableFieldsSelector = (state: RootState) =>
  state.license.editableFields.entities.beneficiary;
export const licenseItemEditableFieldsSelector = (state: RootState) => state.license.editableFields.entities.item;
export const licenseAttDocumentEditableFieldsSelector = (state: RootState) =>
  state.license.editableFields.entities.attached_document;
export const licenseItemsSelector = (state: RootState) => state.license.items;
export const licenseItemsWithErrorsSelector = (state: RootState) => state.license.itemsWithErrors;
export const licenseBeneficiariesSelector = (state: RootState) => state.license.beneficiaries;
export const licenseBeneficiariesWithErrorsSelector = (state: RootState) => state.license.beneficiariesWithErrors;
export const licenseFeesSelector = (state: RootState) => state.license.fees;
export const licenseAttDocumentsSelector = (state: RootState) => state.license.attachedDocuments;
export const licenseAttDocumentsWithErrorsSelector = (state: RootState) => state.license.attachedDocumentsWithErrors;
