import { type FC, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import type { ILicenseNamesAndPartiesContainerProps } from './LicenseNamesAndPartiesContainerTypes';
import LicenseNamesAndPartiesView from '../../components/LicenseNamesAndPartiesView';
import { companiesAdapter } from '../../../../store/companies/entityAdapters';

import { licensePropsEnum } from '../../store/types';

import { licenseEditableFieldsSelector, licenseMandatoryFieldsSelector } from '../../store/selectors';
import { companiesSelector } from '../../../../store/companies/selectors';
import { getCompaniesApi } from '../../../../store/companies/actions';

const LicenseNamesAndPartiesContainer: FC<ILicenseNamesAndPartiesContainerProps> = ({ form }) => {
  const dispatch = useDispatch();
  const [companyCodeSearchValue, setCompanySearchCode] = useState('');

  const companiesAdapterSelectors = companiesAdapter.getSelectors();
  const companiesData = useSelector(companiesSelector);
  const allCompanies = companiesAdapterSelectors.selectAll(companiesData);

  const licenseMandatoryFieldsState = useSelector(licenseMandatoryFieldsSelector);
  const licenseEditableFieldsState = useSelector(licenseEditableFieldsSelector);

  const { setValue, clearErrors } = form;

  useEffect(() => {
    dispatch(getCompaniesApi({ companyCodeValue: companyCodeSearchValue }));
  }, [dispatch, companyCodeSearchValue]);

  const handleCompanyCodeChange = useCallback(
    (value: string) => {
      setCompanySearchCode(value);
    },
    [setCompanySearchCode]
  );

  const handleSetCompanyCode = (companyCode: string) => {
    const companyItem = companiesAdapterSelectors.selectById(companiesData, companyCode);
    const address1 = companyItem?.address1 ?? '';
    const address2 = companyItem?.address2 ?? '';
    setValue(licensePropsEnum.companyDescription, companyItem?.description);
    setValue(licensePropsEnum.companyAddress, `${address1} ${address2}`);
    setValue(licensePropsEnum.companyEmail, companyItem?.email);
    setValue(licensePropsEnum.companyPhone, companyItem?.phoneNumber);

    if (companyItem?.email) {
      clearErrors(licensePropsEnum.companyEmail);
    }

    if (companyItem?.phoneNumber) {
      clearErrors(licensePropsEnum.companyPhone);
    }
  };

  return (
    <LicenseNamesAndPartiesView
      licenseMandatoryFieldsState={licenseMandatoryFieldsState}
      licenseEditableFieldsState={licenseEditableFieldsState}
      handleCompanyCodeChange={handleCompanyCodeChange}
      companyCodeSearchValue={companyCodeSearchValue}
      handleSetCompanyCode={handleSetCompanyCode}
      allCompanies={allCompanies}
      form={form}
    />
  );
};

export default LicenseNamesAndPartiesContainer;
