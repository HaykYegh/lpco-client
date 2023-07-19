import type { UseFormReturn } from 'react-hook-form';

import type { IFeatureFlagsProps, ILicenseTypeByCodeProps } from '../../../../store/licenseType/types';

export interface ILicenseTabViewProps {
  form: UseFormReturn;
  licenseTypeByCodeState: ILicenseTypeByCodeProps;
  licenseTypeFeatureFlagsByCodeState: IFeatureFlagsProps;
  isLicenseFees: boolean;
  licenseCodeSearchValue: string;
  handleLicenseCodeChange: (value: string) => void;
  handleLicenseChange: (licenseTypeCode: string) => void;
  validationOptions: {
    isHeaderWithError: boolean;
    isNamesAndPartiesWithError: boolean;
  };
}
