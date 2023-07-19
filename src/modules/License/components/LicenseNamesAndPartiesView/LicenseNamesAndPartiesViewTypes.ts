// eslint-disable-next-line max-len
import type { ILicenseNamesAndPartiesContainerProps } from '../../containers/LicenseNamesAndPartiesContainer/LicenseNamesAndPartiesContainerTypes';

import type { ICompanyItem } from '../../../../store/companies/types';
import type { IItemsOperationFields } from '../../store/types';

export interface ILicenseNamesAndPartiesViewProps extends ILicenseNamesAndPartiesContainerProps {
  handleCompanyCodeChange: (value: string) => void;
  handleSetCompanyCode: (companyCode: string) => void;
  allCompanies: ICompanyItem[];
  companyCodeSearchValue: string;
  licenseMandatoryFieldsState: Record<string, IItemsOperationFields>;
  licenseEditableFieldsState: Record<string, IItemsOperationFields>;
}
