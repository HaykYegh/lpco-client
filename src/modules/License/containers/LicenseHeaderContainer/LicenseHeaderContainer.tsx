import { type FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { termsOfDeliveryAdapter } from '../../../../store/termsOfDelivery/termsOfDeliveryAdapter';
import { customsOfficeAdapter } from '../../../../store/customsOffice/customsOfficeAdapter';
import { termsOfDeliveryDataSelector } from '../../../../store/termsOfDelivery/selectors';
import { exchangeRateAdapter } from '../../../../store/exchangeRate/exchangeRateAdapter';
import { customsOfficeDataSelector } from '../../../../store/customsOffice/selectors';
import { exchangeRateDataSelector } from '../../../../store/exchangeRate/selectors';
import { getTermsOfDeliveryApi } from '../../../../store/termsOfDelivery/actions';
import type { ILicenseHeaderContainerProps } from './LicenseHeaderContainerTypes';
import { countriesAdapter } from '../../../../store/countries/entityAdapters';
import { getCustomsOfficeApi } from '../../../../store/customsOffice/actions';
import { getExchangeRateApi } from '../../../../store/exchangeRate/actions';
import { licensesSearchSelector } from '../../../Licenses/store/selectors';
import LicenseHeaderView from '../../components/LicenseHeaderView';

import { licenseEditableFieldsSelector, licenseMandatoryFieldsSelector } from '../../store/selectors';
import { countriesSelector } from '../../../../store/countries/selectors';
import { getCountriesApi } from '../../../../store/countries/actions';

const LicenseHeaderContainer: FC<ILicenseHeaderContainerProps> = ({
  form,
  relatedProductsEnabled,
  relatedProducts,
  flowEnabled,
  flow,
  countryOfExportOrImportEnabled,
  typeOfUseEnabled,
  licenseCodeSearchValue,
  handleLicenseCodeChange,
  handleLicenseChange,
  placeOfLoadingEnabled,
  placeOfUnloadingEnabled,
  invoiceValueManagementEnabled,
  termOfDeliveryEnabled,
}) => {
  const dispatch = useDispatch();

  const licensesSearchState = useSelector(licensesSearchSelector);
  const licenseMandatoryFieldsState = useSelector(licenseMandatoryFieldsSelector);
  const licenseEditableFieldsState = useSelector(licenseEditableFieldsSelector);

  const countriesAdapterSelectors = countriesAdapter.getSelectors();
  const countriesData = useSelector(countriesSelector);
  const countriesState = countriesAdapterSelectors.selectAll(countriesData);
  const countriesLength = countriesData.ids.length;

  const customsOfficeAdapterSelectors = customsOfficeAdapter.getSelectors();
  const customsOfficeData = useSelector(customsOfficeDataSelector);
  const customsOfficeState = customsOfficeAdapterSelectors.selectAll(customsOfficeData);

  const termsOfDeliveryAdapterSelectors = termsOfDeliveryAdapter.getSelectors();
  const termsOfDeliveryData = useSelector(termsOfDeliveryDataSelector);
  const termsOfDeliveryState = termsOfDeliveryAdapterSelectors.selectAll(termsOfDeliveryData);

  const exchangeRateAdapterSelectors = exchangeRateAdapter.getSelectors();
  const exchangeRateData = useSelector(exchangeRateDataSelector);
  const exchangeRateState = exchangeRateAdapterSelectors.selectAll(exchangeRateData);

  useEffect(() => {
    if (!countriesLength) {
      dispatch(getCountriesApi({ countryCodeValue: '' }));
    }
  }, [dispatch, countriesLength]);

  const getCustomsOfficeData = (value = '') => {
    dispatch(getCustomsOfficeApi({ customsOfficeSearchValue: value }));
  };

  const getTermsOfDeliveryData = (value = '') => {
    dispatch(getTermsOfDeliveryApi({ termsOfDeliverySearchValue: value }));
  };

  const getExchangeRateData = (value = '') => {
    dispatch(getExchangeRateApi({ exchangeRateSearchValue: value }));
  };

  const handlePlaceIfLoadingFocus = () => {
    getCustomsOfficeData();
  };

  const handleChangeCustomOfficeData = (value: string) => {
    getCustomsOfficeData(value);
  };

  const handleTermsOfDeliveryFocus = () => {
    getTermsOfDeliveryData();
  };

  const handleChangeTermsOfDeliveryData = (value: string) => {
    getTermsOfDeliveryData(value);
  };

  const handleExchangeRateFocus = () => {
    getExchangeRateData();
  };

  const handleChangeExchangeRateData = (value: string) => {
    getExchangeRateData(value);
  };

  return (
    <LicenseHeaderView
      handleChangeTermsOfDeliveryData={handleChangeTermsOfDeliveryData}
      countryOfExportOrImportEnabled={countryOfExportOrImportEnabled}
      invoiceValueManagementEnabled={invoiceValueManagementEnabled}
      handleChangeCustomOfficeData={handleChangeCustomOfficeData}
      handleChangeExchangeRateData={handleChangeExchangeRateData}
      licenseMandatoryFieldsState={licenseMandatoryFieldsState}
      licenseEditableFieldsState={licenseEditableFieldsState}
      handleTermsOfDeliveryFocus={handleTermsOfDeliveryFocus}
      handlePlaceIfLoadingFocus={handlePlaceIfLoadingFocus}
      handleLicenseCodeChange={handleLicenseCodeChange}
      placeOfUnloadingEnabled={placeOfUnloadingEnabled}
      handleExchangeRateFocus={handleExchangeRateFocus}
      relatedProductsEnabled={relatedProductsEnabled}
      licenseCodeSearchValue={licenseCodeSearchValue}
      placeOfLoadingEnabled={placeOfLoadingEnabled}
      termOfDeliveryEnabled={termOfDeliveryEnabled}
      termsOfDeliveryState={termsOfDeliveryState}
      licensesSearchState={licensesSearchState}
      handleLicenseChange={handleLicenseChange}
      customsOfficeState={customsOfficeState}
      exchangeRateState={exchangeRateState}
      typeOfUseEnabled={typeOfUseEnabled}
      relatedProducts={relatedProducts}
      countriesState={countriesState}
      flowEnabled={flowEnabled}
      form={form}
      flow={flow}
    />
  );
};

export default LicenseHeaderContainer;
