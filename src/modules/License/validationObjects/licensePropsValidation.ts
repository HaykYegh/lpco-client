import { namesAndPartiesValidation } from './namesAndPartiesValidation';
import { headerValidation } from './headerValidation';

export const licensePropsValidation = {
  ...headerValidation,
  ...namesAndPartiesValidation,
};
