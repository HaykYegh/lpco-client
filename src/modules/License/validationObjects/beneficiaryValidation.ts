import * as yup from 'yup';

import { mandatoryField } from '../../../constatnts/errorMessages';

export const beneficiaryValidation = {
  code: yup.object().nullable().required(mandatoryField),
  phoneNumber: yup.string().trim().required(mandatoryField),
  email: yup.string().trim().email().required(mandatoryField),
};
