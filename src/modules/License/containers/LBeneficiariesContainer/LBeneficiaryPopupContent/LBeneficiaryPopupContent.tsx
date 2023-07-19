import { type FC, useCallback, useEffect, useState } from 'react';

import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import type { EntityId } from '@reduxjs/toolkit';
import * as yup from 'yup';

import LBeneficiaryPopupContentView from '../../../components/LBeneficiariesView/LBeneficiaryPopupContentView';
import { beneficiaryValidation } from '../../../validationObjects/beneficiaryValidation';
import { popupConfigsDataSelector } from '../../../../../store/popupConfigs/selectors';
import { getSchemaObject, type IFields } from '../../../../../helpers/getSchemaObject';
import { companiesAdapter } from '../../../../../store/companies/entityAdapters';
import { beneficiaryInfoDefaultValues } from './beneficiaryInfoDefaultValues';
import { removePopupConfig } from '../../../../../store/popupConfigs/slices';
import type { IBeneficiaryFormData } from './LBeneficiaryPopupContentTypes';
import { PopupNames } from '../../../../../store/popupConfigs/types';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';

import { ChangeMethods } from '../../../store/types';

import {
  licenseBeneficiariesSelector,
  licenseBeneficiaryEditableFieldsSelector,
  licenseBeneficiaryMandatoryFieldsSelector,
} from '../../../store/selectors';
import {
  addLicenseBeneficiary,
  removeLicenseBeneficiaryWithErrors,
  updateLicenseBeneficiary,
} from '../../../store/slices';
import { companiesSelector } from '../../../../../store/companies/selectors';
import { getCompaniesApi } from '../../../../../store/companies/actions';

const LBeneficiaryPopupContent: FC = () => {
  const [companyCodeValue, setCompanyCodeValue] = useState('');
  const [validObject, setValidObject] = useState<Record<string, any>>({});
  const { type } = useTypeInPath();
  const beneficiaryValidationSchema = yup.object(validObject);
  const form = useForm({
    resolver: yupResolver(beneficiaryValidationSchema),
    defaultValues: beneficiaryInfoDefaultValues,
    mode: 'onChange',
  }) as unknown as UseFormReturn;

  const { reset, setValue, watch, trigger } = form;

  const dispatch = useDispatch();

  const companiesAdapterSelectors = companiesAdapter.getSelectors();
  const companiesData = useSelector(companiesSelector);
  const companiesState = companiesAdapterSelectors.selectAll(companiesData);

  const popupConfigsData = useSelector(popupConfigsDataSelector);
  const popupInfo = popupConfigsData.entities[PopupNames.BENEFICIARIES];
  const beneficiaryId = popupInfo?.data?.id;

  const beneficiariesData = useSelector(licenseBeneficiariesSelector);

  const beneficiaryCodeWatch: OptionsItemType = watch('code');
  const beneficiaryCode: string = beneficiaryCodeWatch?.value;
  const companyItem = companiesAdapterSelectors.selectById(companiesData, beneficiaryCode);

  const mandatoryFields = useSelector(licenseBeneficiaryMandatoryFieldsSelector);
  const editableFields = useSelector(licenseBeneficiaryEditableFieldsSelector);

  const itemChangeMethod = beneficiaryId ? ChangeMethods.EDIT : ChangeMethods.ADD;

  const getSendingData = (data: IBeneficiaryFormData) => ({
    code: data.code?.value,
    description: data.description,
    phoneNumber: data.phoneNumber,
    email: data.email,
  });

  const handleClosePopup = useCallback(() => {
    dispatch(removePopupConfig(PopupNames.BENEFICIARIES));
    reset({ ...beneficiaryInfoDefaultValues });
  }, [dispatch, reset]);

  const handleCreateBeneficiary = useCallback(
    (data: IBeneficiaryFormData) => {
      dispatch(
        addLicenseBeneficiary({
          ...getSendingData(data),
          id: Date.now(),
        })
      );
      handleClosePopup();
    },
    [dispatch, handleClosePopup]
  );

  const handleUpdateBeneficiary = (data: IBeneficiaryFormData) => {
    if (beneficiariesData.entities[beneficiaryId]) {
      dispatch(
        updateLicenseBeneficiary({
          id: beneficiaryId,
          changes: getSendingData(data),
        })
      );
    } else {
      dispatch(removeLicenseBeneficiaryWithErrors(beneficiaryId as EntityId));
      dispatch(
        addLicenseBeneficiary({
          ...getSendingData(data),
          id: beneficiaryId,
        })
      );
    }

    handleClosePopup();
  };

  useEffect(() => {
    const schemaObject = getSchemaObject(mandatoryFields as IFields, beneficiaryValidation, editableFields as IFields);
    setValidObject(schemaObject);
  }, [mandatoryFields, editableFields]);

  useEffect(() => {
    dispatch(getCompaniesApi({ companyCodeValue }));
  }, [dispatch, companyCodeValue]);

  useEffect(() => {
    if (beneficiaryId) {
      const code = popupInfo.data.code;
      reset({
        ...popupInfo.data,
        code: code
          ? {
              label: code,
              value: code,
              tag: popupInfo.data.description,
            }
          : null,
      });
    }
  }, [beneficiaryId, popupInfo, reset]);

  useEffect(() => {
    if (beneficiaryId) {
      void trigger();
    }
  }, [beneficiaryId, trigger]);

  const handleCompaniesCodeChange = useCallback(
    (value: string) => {
      setCompanyCodeValue(value);
    },
    [setCompanyCodeValue]
  );

  const handleCompanyChange = useCallback(
    (beneficiaryValue: string) => {
      if (companyItem || !beneficiaryValue) {
        setValue('description', companyItem?.description ?? '');
      }
    },
    [companyItem, setValue]
  );

  return (
    <FormProvider {...form}>
      <LBeneficiaryPopupContentView
        title={beneficiaryId ? 'Edit Beneficiary' : 'Add New Beneficiary'}
        handleCompaniesCodeChange={handleCompaniesCodeChange}
        handleCreateBeneficiary={handleCreateBeneficiary}
        handleUpdateBeneficiary={handleUpdateBeneficiary}
        handleCompanyChange={handleCompanyChange}
        itemChangeMethod={itemChangeMethod}
        handleClosePopup={handleClosePopup}
        companyCodeValue={companyCodeValue}
        mandatoryFields={mandatoryFields}
        companiesState={companiesState}
        editableFields={editableFields}
        showPopup={!!popupInfo}
        type={type}
        form={form}
      />
    </FormProvider>
  );
};

export default LBeneficiaryPopupContent;
