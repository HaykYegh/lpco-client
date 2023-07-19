import * as yup from 'yup';

import { mandatoryField, zeroOrPositive } from '../../../constatnts/errorMessages';
import { transformNaNValueToUndefined } from '../../../helpers/transformNaNValue';

export const headerValidation = {
  licenseType: yup.object().nullable().required(mandatoryField),
  userReferenceNumber: yup.string().trim().required(mandatoryField),
  requestNumber: yup.string().trim().required(mandatoryField),
  requestDate: yup.date().nullable().required(mandatoryField),
  approvalReference: yup.string().trim().required(mandatoryField),
  approvalDate: yup.date().nullable().required(mandatoryField),
  approvalFrom: yup.date().nullable().required(mandatoryField),
  approvalTo: yup.date().nullable().required(mandatoryField),
  countryOfDestinationCode: yup.object().nullable().required(mandatoryField),
  typeOfUse: yup.object().nullable().required(mandatoryField),
  placeOfLoadingCode: yup.object().nullable().required(mandatoryField),
  placeOfUnloadingCode: yup.object().nullable().required(mandatoryField),
  termsOfDeliveryCode: yup.object().nullable().required(mandatoryField),
  invoiceCurrencyCode: yup.object().nullable().required(mandatoryField),
  invoiceAmountInForeignCurrency: yup
    .number()
    .transform(transformNaNValueToUndefined)
    .min(0, zeroOrPositive)
    .required(mandatoryField),
  invoiceAmountInNationalCurrency: yup
    .number()
    .transform(transformNaNValueToUndefined)
    .min(0, zeroOrPositive)
    .required(mandatoryField),
};
