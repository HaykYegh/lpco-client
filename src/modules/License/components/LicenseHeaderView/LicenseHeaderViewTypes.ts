import type { ILicenseHeaderContainerProps } from '../../containers/LicenseHeaderContainer/LicenseHeaderContainerTypes';
import type { ITermsOfDeliveryItem } from '../../../../store/termsOfDelivery/types';
import type { ICustomsOfficeItem } from '../../../../store/customsOffice/types';
import type { GetLicenseTypeApiPayload } from '../../../Licenses/store/types';
import type { IExchangeRateItem } from '../../../../store/exchangeRate/types';

import type { ICountryItem } from '../../../../store/countries/types';
import type { IItemsOperationFields } from '../../store/types';

export interface ILicenseHeaderViewProps extends ILicenseHeaderContainerProps {
  licenseCodeSearchValue: string;
  licensesSearchState: GetLicenseTypeApiPayload[];
  countriesState: ICountryItem[];
  handleLicenseCodeChange: (value: string) => void;
  handleLicenseChange: (licenseTypeCode: string) => void;
  licenseMandatoryFieldsState: Record<string, IItemsOperationFields>;
  licenseEditableFieldsState: Record<string, IItemsOperationFields>;
  handlePlaceIfLoadingFocus: () => void;
  handleTermsOfDeliveryFocus: () => void;
  handleExchangeRateFocus: () => void;
  handleChangeCustomOfficeData: (value: string) => void;
  handleChangeTermsOfDeliveryData: (value: string) => void;
  handleChangeExchangeRateData: (value: string) => void;
  customsOfficeState: ICustomsOfficeItem[];
  termsOfDeliveryState: ITermsOfDeliveryItem[];
  exchangeRateState: IExchangeRateItem[];
}
