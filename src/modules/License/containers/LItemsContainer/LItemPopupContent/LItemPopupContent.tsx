import { type FC, useCallback, useEffect, useState } from 'react';

import { FormProvider, useForm, type UseFormReturn, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import type { EntityId } from '@reduxjs/toolkit';
import * as yup from 'yup';

import LItemPopupContentView from '../../../components/LItemsView/LItemPopupContentView';
import { commoditiesAdapter } from '../../../../../store/commodities/commoditiesAdapter';
import { popupConfigsDataSelector } from '../../../../../store/popupConfigs/selectors';
import { licenseTypeByCodeSelector } from '../../../../../store/licenseType/selectors';
import { getSchemaObject, type IFields } from '../../../../../helpers/getSchemaObject';
import { PopupFormMethods, PopupNames } from '../../../../../store/popupConfigs/types';
import { countriesAdapter } from '../../../../../store/countries/entityAdapters';
import { packagesAdapter } from '../../../../../store/packages/packagesAdapter';
import { removePopupConfig } from '../../../../../store/popupConfigs/slices';
import { itemValidation } from '../../../validationObjects/itemValidation';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import { itemInfoDefaultValues } from './itemInfoDefaultValues';
import type { IItemFormData } from './LItemPopupContentTypes';

import { ChangeMethods } from '../../../store/types';

import {
  licenseItemEditableFieldsSelector,
  licenseItemMandatoryFieldsSelector,
  licenseItemsSelector,
} from '../../../store/selectors';
import { addLicenseItem, removeLicenseItemWithErrors, updateLicenseItem } from '../../../store/slices';
import { commoditiesSelector } from '../../../../../store/commodities/selectors';
import { countriesSelector } from '../../../../../store/countries/selectors';
import { getCommoditiesApi } from '../../../../../store/commodities/actions';
import { packagesSelector } from '../../../../../store/packages/selectors';
import { getCountriesApi } from '../../../../../store/countries/actions';
import { getPackagesApi } from '../../../../../store/packages/actions';

const LItemPopupContent: FC = () => {
  const [commodityCodeValue, setCommodityCodeValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [validObject, setValidObject] = useState({});
  const itemValidationSchema = yup.object(validObject);
  const licenseTypeByCodeState = useSelector(licenseTypeByCodeSelector);
  const { type } = useTypeInPath();
  const form = useForm({
    resolver: yupResolver(itemValidationSchema),
    defaultValues: { ...itemInfoDefaultValues, quotaType: licenseTypeByCodeState.quotaType },
    mode: 'onChange',
  }) as unknown as UseFormReturn;

  const { reset, setValue, watch, trigger } = form;

  const invoiceCurrencyCode = useWatch({ name: 'invoiceCurrencyCode' });

  const dispatch = useDispatch();

  const countriesAdapterSelectors = countriesAdapter.getSelectors();
  const countriesData = useSelector(countriesSelector);
  const countriesState = countriesAdapterSelectors.selectAll(countriesData);
  const countriesLength = countriesData.ids.length;

  const commoditiesSelectors = commoditiesAdapter.getSelectors();
  const commoditiesData = useSelector(commoditiesSelector);
  const commoditiesState = commoditiesSelectors.selectAll(commoditiesData);

  const popupConfigsData = useSelector(popupConfigsDataSelector);
  const popupInfo = popupConfigsData.entities[PopupNames.ITEMS];
  const method = popupInfo?.method;
  const itemId = popupInfo?.data?.id;

  const commodityCodeWatch: OptionsItemType = watch('commodityCode');
  const commodityCode: string = commodityCodeWatch?.value;
  const commodityItem = commoditiesSelectors.selectById(commoditiesData, commodityCode);

  const packagesAdapterSelectors = packagesAdapter.getSelectors();
  const packagesData = useSelector(packagesSelector);
  const packagesState = packagesAdapterSelectors.selectAll(packagesData);
  const packagesLength = packagesData.ids.length;

  const mandatoryFields = useSelector(licenseItemMandatoryFieldsSelector);
  const editableFields = useSelector(licenseItemEditableFieldsSelector);

  const licenseItemsData = useSelector(licenseItemsSelector);

  const handleClosePopup = useCallback(() => {
    dispatch(removePopupConfig(PopupNames.ITEMS));
    reset({ ...itemInfoDefaultValues });
  }, [dispatch, reset]);

  const getSendingData = (data: IItemFormData) => ({
    commodityCode: data.commodityCode?.value ?? null,
    commodityDescription: data.commodityDescription,
    commercialDescription: data.commercialDescription,
    countryOfOriginCode: data.countryOfOriginCode?.value,
    manufacturerName: data.manufacturerName,
    quotaType: data.quotaType,
    grossMass: data.grossMass,
    netMass: data.netMass,
    packageTypeCode: data.packageTypeCode?.value,
    packageMark: data.packageMark,
    packageNumber: data.packageNumber,
    requestedAmount: data.requestedAmount,
    approvedAmount: data.approvedAmount,
    remainingAmount: data.remainingAmount,
    itemInvoiceAmountInForeignCurrency: data.itemInvoiceAmountInForeignCurrency ?? null,
    itemInvoiceAmountInNationalCurrency: data.itemInvoiceAmountInNationalCurrency,
  });

  const handleCreateItem = useCallback(
    (data: IItemFormData) => {
      if (disabled) {
        return false;
      }

      dispatch(
        addLicenseItem({
          ...getSendingData(data),
          id: Date.now(),
        })
      );
      handleClosePopup();
      setDisabled(true);
    },
    [dispatch, handleClosePopup, disabled]
  );

  const handleUpdateItem = (data: IItemFormData) => {
    if (disabled) {
      return false;
    }

    if (licenseItemsData.entities[itemId]) {
      dispatch(
        updateLicenseItem({
          id: itemId,
          changes: getSendingData(data),
        })
      );
    } else {
      dispatch(removeLicenseItemWithErrors(itemId as EntityId));
      dispatch(
        addLicenseItem({
          ...getSendingData(data),
          id: itemId,
        })
      );
    }

    handleClosePopup();
    setDisabled(true);
  };

  useEffect(() => {
    if (method) {
      setDisabled(false);
    }
  }, [method]);

  useEffect(() => {
    if (!countriesLength) {
      dispatch(getCountriesApi({ countryCodeValue: '' }));
    }
  }, [dispatch, countriesLength]);

  useEffect(() => {
    dispatch(getCommoditiesApi({ commodityCodeValue }));
  }, [dispatch, commodityCodeValue]);

  useEffect(() => {
    if (!packagesLength) {
      dispatch(getPackagesApi({ packageCodeValue: '' }));
    }
  }, [dispatch, packagesLength]);

  useEffect(() => {
    if (itemId) {
      const countryOfOriginName = popupInfo.data.countryOfOriginCode;
      const commodityCode = popupInfo.data.commodityCode;
      const packageTypeCode = popupInfo.data.packageTypeCode;

      reset({
        ...popupInfo.data,
        countryOfOriginCode: countryOfOriginName
          ? {
              label: countryOfOriginName,
              value: countryOfOriginName,
              tag: { label: popupInfo.data.countryOfOriginName },
            }
          : null,
        commodityCode: commodityCode
          ? {
              label: commodityCode,
              value: commodityCode,
            }
          : null,
        packageTypeCode: packageTypeCode
          ? {
              label: packageTypeCode,
              value: packageTypeCode,
              tag: { label: packagesData.entities[packageTypeCode]?.description ?? null },
            }
          : null,
      });
    }
  }, [itemId, popupInfo, reset]);

  useEffect(() => {
    const schemaObject = getSchemaObject(mandatoryFields as IFields, itemValidation, editableFields as IFields);
    setValidObject(schemaObject);
  }, [mandatoryFields, editableFields]);

  useEffect(() => {
    if (itemId) {
      void trigger();
    }
  }, [itemId, trigger]);

  const handleCommoditiesCodeChange = useCallback(
    (value: string) => {
      setCommodityCodeValue(value);
    },
    [setCommodityCodeValue]
  );

  const handleCommodityChange = useCallback(
    (commodityValue: string) => {
      if (commodityItem || !commodityValue) {
        setValue('commodityDescription', commodityItem?.description);
      }
    },
    [commodityItem, setValue]
  );

  return (
    <FormProvider {...form}>
      <LItemPopupContentView
        title={popupInfo?.method === PopupFormMethods.VIEW ? 'View Item' : itemId ? 'Edit Item' : 'Add New Item'}
        itemChangeMethod={itemId ? ChangeMethods.EDIT : ChangeMethods.ADD}
        handleCommoditiesCodeChange={handleCommoditiesCodeChange}
        handleCommodityChange={handleCommodityChange}
        invoiceCurrencyCode={invoiceCurrencyCode}
        commodityCodeValue={commodityCodeValue}
        handleCreateItem={handleCreateItem}
        handleUpdateItem={handleUpdateItem}
        handleClosePopup={handleClosePopup}
        commoditiesState={commoditiesState}
        mandatoryFields={mandatoryFields}
        countriesState={countriesState}
        editableFields={editableFields}
        packagesState={packagesState}
        showPopup={!!popupInfo}
        method={method}
        type={type}
        form={form}
      />
    </FormProvider>
  );
};

export default LItemPopupContent;
