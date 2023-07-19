import * as yup from 'yup';

import { currentDate, mandatoryField } from '../../../constatnts/errorMessages';
import { getFormatDate } from '../../../helpers/getFormatDate';

export const attDocumentValidation = {
  code: yup.object().nullable().required(mandatoryField),
  referenceNumber: yup.string().trim().required(mandatoryField),
  attachmentDate: yup.date().nullable().max(getFormatDate('', 'YYYY/MM/DD'), currentDate).required(mandatoryField),
  fileUrl: yup.string().trim().required(mandatoryField),
};
