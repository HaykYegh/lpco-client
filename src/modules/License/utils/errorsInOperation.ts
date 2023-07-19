import type { FieldValues } from 'react-hook-form';
import type { EntityId } from '@reduxjs/toolkit';

import { licensePropsValidation } from '../validationObjects/licensePropsValidation';
import { beneficiaryValidation } from '../validationObjects/beneficiaryValidation';
import { attDocumentValidation } from '../validationObjects/attDocumentValidation';
import { getErrorItemsFromState } from '../../../helpers/getErrorItemsFromState';
import { getSchemaObject, type IFields } from '../../../helpers/getSchemaObject';
import { itemValidation } from '../validationObjects/itemValidation';
import { isValid } from '../../../helpers/isValid';

import type {
  IAttDocumentEntityProps,
  IBeneficiaryItemEntityProps,
  IItemsItemEntityProps,
  IOperationFields,
} from '../store/types';

export interface IHasErrorsInOperation {
  licenseProps: FieldValues;
  beneficiariesState: IBeneficiaryItemEntityProps;
  attachedDocumentsState: IAttDocumentEntityProps;
  itemsState: IItemsItemEntityProps;
  mandatoryFields: IOperationFields;
  operation: EntityId;
}

export function errorsInOperation({
  licenseProps,
  beneficiariesState,
  attachedDocumentsState,
  itemsState,
  mandatoryFields,
  operation,
}: IHasErrorsInOperation) {
  const licensePropsMandatoryFields = mandatoryFields.entities?.lpco;

  if (licensePropsMandatoryFields?.entities?.ogaOperation) {
    licenseProps.ogaOperation = operation;
  }

  const licensePropsYupFields = getSchemaObject(licensePropsMandatoryFields as IFields, licensePropsValidation);
  const isLicensePropsValid = isValid(licensePropsYupFields, licenseProps);

  const beneficiaryMandataryFields = mandatoryFields.entities?.beneficiary;
  const beneficiaryYupFields = getSchemaObject(beneficiaryMandataryFields as IFields, beneficiaryValidation);

  const beneficiaryErrors = getErrorItemsFromState(beneficiariesState, beneficiaryYupFields);
  const beneficiaryErrorIds = beneficiaryErrors.ids;

  const attachedDocumentMandataryFields = mandatoryFields.entities?.attachedDocument;
  const attachedDocumentYupFields = getSchemaObject(attachedDocumentMandataryFields as IFields, attDocumentValidation);

  const attachedDocumentErrors = getErrorItemsFromState(attachedDocumentsState, attachedDocumentYupFields);
  const attachedDocumentErrorIds = attachedDocumentErrors.ids;

  const itemMandataryFields = mandatoryFields.entities?.item;
  const itemYupFields = getSchemaObject(itemMandataryFields as IFields, itemValidation);
  const itemErrors = getErrorItemsFromState(itemsState, itemYupFields);
  const itemErrorIds = itemErrors.ids;

  const hasErrors =
    !isLicensePropsValid || !!attachedDocumentErrorIds.length || !!itemErrorIds.length || !!beneficiaryErrorIds.length;

  return {
    hasErrors,
    beneficiaryErrors,
    attachedDocumentErrors,
    itemErrors,
  };
}
