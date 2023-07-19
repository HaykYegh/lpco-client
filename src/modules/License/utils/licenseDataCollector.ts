import { attDocumentsAdapter, beneficiariesAdapter, itemsAdapter } from '../store/entityAdapters';
import { createDataFromArrayItems } from '../../../helpers/createDataFromArrayItems';
import { generateDataFromEntities } from '../../../helpers/generateDataFromEntities';
import type { ILicenseTypeByCodeProps } from '../../../store/licenseType/types';

import type {
  IAttDocumentEntityProps,
  IBeneficiaryItemEntityProps,
  IItemsItemEntityProps,
  IItemsOperationFields,
} from '../store/types';

export interface ILicenseDataCollectorParam {
  beneficiariesState: IBeneficiaryItemEntityProps;
  attachedDocumentsState: IAttDocumentEntityProps;
  itemsState: IItemsItemEntityProps;
  licenseTypeByCodeStete: ILicenseTypeByCodeProps;
  licenseProps: Record<string, any>;
  editableFieldsEntities: Record<string, IItemsOperationFields>;
}

export function licenseDataCollector({
  beneficiariesState,
  attachedDocumentsState,
  itemsState,
  licenseTypeByCodeStete,
  licenseProps,
  editableFieldsEntities,
}: ILicenseDataCollectorParam) {
  const licenseFields = {
    ...licenseProps,
    typeOfUse: licenseProps.typeOfUse?.value,
    licenseType: licenseProps.licenseType?.value,
    countryOfDestinationCode: licenseProps.countryOfDestinationCode?.value,
    companyCode: licenseProps.companyCode?.value,
    placeOfUnloadingCode: licenseProps.placeOfUnloadingCode?.value,
    placeOfUnloadingName: licenseProps.placeOfUnloadingCode?.tag?.label,
    placeOfLoadingCode: licenseProps.placeOfLoadingCode?.value,
    placeOfLoadingName: licenseProps.placeOfLoadingName?.tag?.label,
    termsOfDeliveryCode: licenseProps.termsOfDeliveryCode?.value,
    termsOfDeliveryDescription: licenseProps.termsOfDeliveryCode?.tag?.label,
    invoiceCurrencyCode: licenseProps.invoiceCurrencyCode?.value,
    invoiceExchangeRate: licenseProps.invoiceCurrencyCode?.tag?.label,
  };
  const licensePropsEditableFieldsIds = editableFieldsEntities?.lpco?.ids;
  const beneficiariesEditableFieldsIds = editableFieldsEntities?.beneficiary?.ids;
  const attachedDocumentsEditableFieldsIds = editableFieldsEntities?.attached_document?.ids;
  const itemsEditableFieldsIds = editableFieldsEntities?.item?.ids;
  const licensePropsFields = createDataFromArrayItems(licensePropsEditableFieldsIds, licenseFields);

  const beneficiariesAdapterSelectors = beneficiariesAdapter.getSelectors();
  const allBeneficiaries = beneficiariesAdapterSelectors.selectAll(beneficiariesState);
  const beneficiaries = generateDataFromEntities(allBeneficiaries, beneficiariesEditableFieldsIds);

  const attDocumentsAdapterSelectors = attDocumentsAdapter.getSelectors();
  const allAttachedDocuments = attDocumentsAdapterSelectors.selectAll(attachedDocumentsState);
  const attachedDocuments = generateDataFromEntities(allAttachedDocuments, [
    ...(attachedDocumentsEditableFieldsIds ?? []),
  ]);

  const itemsAdapterSelectors = itemsAdapter.getSelectors();
  const allItems = itemsAdapterSelectors.selectAll(itemsState);
  const items = generateDataFromEntities(allItems, itemsEditableFieldsIds);

  return {
    ...licensePropsFields,
    beneficiaries,
    attachedDocuments,
    items,
    licenseTypeId: licenseTypeByCodeStete.id,
  };
}
