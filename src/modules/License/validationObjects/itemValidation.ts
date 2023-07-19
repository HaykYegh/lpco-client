import * as yup from 'yup';

import { grossMassError, mandatoryField, zeroOrPositive } from '../../../constatnts/errorMessages';
import { transformNaNValueToUndefined } from '../../../helpers/transformNaNValue';

export const itemValidation = {
  commodityCode: yup.object().nullable().required(mandatoryField),
  commercialDescription: yup.string().trim().required(mandatoryField),
  countryOfOriginCode: yup.object().nullable().required(mandatoryField),
  manufacturerName: yup.string().trim().required(mandatoryField),
  packageMark: yup.string().trim().required(mandatoryField),
  packageNumber: yup.number().transform(transformNaNValueToUndefined).min(0, zeroOrPositive).required(mandatoryField),
  itemInvoiceAmountInForeignCurrency: yup
    .number()
    .transform(transformNaNValueToUndefined)
    .min(0, zeroOrPositive)
    .required(mandatoryField),
  itemInvoiceAmountInNationalCurrency: yup
    .number()
    .transform(transformNaNValueToUndefined)
    .min(0, zeroOrPositive)
    .required(mandatoryField),
  packageTypeCode: yup.object().nullable().required(mandatoryField),
  quotaType: yup.string().trim().required(mandatoryField),
  requestedAmount: yup.number().transform(transformNaNValueToUndefined).min(0, zeroOrPositive).required(mandatoryField),
  approvedAmount: yup.number().transform(transformNaNValueToUndefined).min(0, zeroOrPositive).required(mandatoryField),
  remainingAmount: yup.number().transform(transformNaNValueToUndefined).min(0, zeroOrPositive).required(mandatoryField),
  grossMass: yup.number().transform(transformNaNValueToUndefined).min(0, zeroOrPositive).required(mandatoryField),
  netMass: yup
    .number()
    .transform(transformNaNValueToUndefined)
    .min(0, zeroOrPositive)
    .when('grossMass', (grossMass: number, schema: yup.NumberSchema) => schema.max(grossMass, grossMassError))
    .required(mandatoryField),
};
