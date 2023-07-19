import * as yup from 'yup';

import { mandatoryField, validEmail } from '../../../constatnts/errorMessages';

export const namesAndPartiesValidation = {
  declarantCode: yup.string().trim().required(mandatoryField),
  declarantName: yup.string().trim().required(mandatoryField),
  companyCode: yup.object().nullable().required(mandatoryField),
  companyPhone: yup.string().trim().required(mandatoryField),
  companyEmail: yup.string().trim().nullable().email(validEmail).required(mandatoryField),
};
