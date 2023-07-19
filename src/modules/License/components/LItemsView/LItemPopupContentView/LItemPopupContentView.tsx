import { type FC, type MouseEventHandler, useEffect } from 'react';

import { Controller, type FieldValues, type SubmitHandler, type UseFormReturn, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Button, Input, Select } from '@wf/components';

import {
  licenseTypeByCodeSelector,
  licenseTypeFeatureFlagsByCodeSelector,
} from '../../../../../store/licenseType/selectors';
import { filterDataByPropNameInArray } from '../../../../../helpers/filterDataByPropNameInArray';
import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import { PopupFormMethods } from '../../../../../store/popupConfigs/types';
import { grossMassError } from '../../../../../constatnts/errorMessages';
import type { ILItemPopupViewProps } from './LItemPopupContentViewType';
import LItemPopupContentViewTexts from './LItemPopupContentViewTexts';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';
import Switcher from '../../../../../components/Switcher';
import Popup from '../../../../../components/Popup';
import Label from '../../../../../components/Label';

import { ChangeMethods } from '../../../store/types';
import { QuotaType } from '../../../constants';

import { NATIONAL_CURRENCY } from '../../../../../constatnts';
import { quotaTypeItems } from '../../../options';

import styles from './LItemPopupContentView.module.scss';

const LItemPopupContentView: FC<ILItemPopupViewProps> = ({
  form,
  itemChangeMethod,
  showPopup,
  title,
  handleCreateItem,
  handleUpdateItem,
  handleClosePopup,
  countriesState,
  commoditiesState,
  handleCommoditiesCodeChange,
  commodityCodeValue,
  handleCommodityChange,
  mandatoryFields,
  editableFields,
  packagesState,
  method,
  invoiceCurrencyCode,
}) => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = form as UseFormReturn;

  const view = method === PopupFormMethods.VIEW;

  const quotaType = useWatch({ name: 'quotaType' });
  const commodity = useWatch({ name: 'commodityCode' });
  const netMass = useWatch({ name: 'netMass' });
  const grossMass = useWatch({ name: 'grossMass' });
  const itemInvoiceAmountInForeignCurrency = useWatch({ name: 'itemInvoiceAmountInForeignCurrency' });
  const commodityValue: string = commodity?.value;
  const unLimitedQuotaType = quotaType === QuotaType.UNLIMITED;

  const mandatoryEntities = mandatoryFields?.entities;
  const editableEntities = editableFields?.entities;

  const licenseTypeByCodeState = useSelector(licenseTypeByCodeSelector);
  const licenseTypeFeatureFlagsByCodeState = useSelector(licenseTypeFeatureFlagsByCodeSelector);

  const invoiceCurrencyCodeValue = Number(invoiceCurrencyCode?.tag?.label);
  const invoiceCurrency = invoiceCurrencyCode?.value;

  useEffect(() => {
    if (unLimitedQuotaType) {
      setValue('grossMass', '');
    }
  }, [unLimitedQuotaType, setValue]);

  useEffect(() => {
    handleCommodityChange(commodityValue);
  }, [handleCommodityChange, commodityValue]);

  useEffect(() => {
    if (invoiceCurrencyCodeValue) {
      const itemInvoiceAmountInNationalCurrencyValue = itemInvoiceAmountInForeignCurrency * invoiceCurrencyCodeValue;
      setValue('itemInvoiceAmountInNationalCurrency', itemInvoiceAmountInNationalCurrencyValue || null);
    }
  }, [setValue, itemInvoiceAmountInForeignCurrency, invoiceCurrencyCodeValue]);

  useEffect(() => {
    if (Number(grossMass) >= Number(netMass)) {
      clearErrors('netMass');
    } else {
      netMass && setError('netMass', { message: grossMassError });
    }
  }, [grossMass, netMass]);

  const filterOptions = () => !!commoditiesState.length;

  return (
    <Popup title={title} showPopup={showPopup} handleClosePopup={handleClosePopup} hasCloseIcon={!view}>
      <div className={styles.content}>
        <div className={styles.content_body}>
          <SectionBody>
            <SectionRow>
              <Controller
                render={({ field }) => (
                  <Select
                    label={<Label mandatory={!!mandatoryEntities?.commodityCode}>Commodity Code</Label>}
                    options={createOptionsArrayFromData(commoditiesState, 'code', 'code')}
                    errorMessage={errors?.commodityCode?.message as string}
                    placeholder="Search commodity code"
                    isClearable
                    {...field}
                    disabled={!editableEntities?.commodityCode || view}
                    onInputChange={handleCommoditiesCodeChange}
                    inputValue={commodityCodeValue}
                    filterOption={filterOptions}
                  />
                )}
                name="commodityCode"
                control={control}
              />
            </SectionRow>
            <SectionRow>
              <Input
                label={<Label>Commodity Description</Label>}
                placeholder="Commodity description"
                textarea={true}
                disabled={true}
                {...register('commodityDescription')}
              />
            </SectionRow>
            <hr />
            <SectionRow>
              <Input
                label={
                  <Label mandatory={!!mandatoryEntities?.commercialDescription}>
                    Commercial Description (Goods Name)
                  </Label>
                }
                errorMessage={errors?.commercialDescription?.message as string}
                disabled={!editableEntities?.commercialDescription || view}
                placeholder="Write commercial description"
                textarea
                {...register('commercialDescription')}
              />
            </SectionRow>
            <SectionRow>
              <Controller
                render={({ field }) => (
                  <Select
                    label={<Label mandatory={!!mandatoryEntities?.countryOfOriginCode}>Country Of Origin</Label>}
                    options={createOptionsArrayFromData(countriesState, 'code', 'code', 'description')}
                    errorMessage={errors?.countryOfOriginCode?.message as string}
                    placeholder="Choose country of origin"
                    isClearable
                    {...field}
                    disabled={!editableEntities?.countryOfOriginCode || view}
                  />
                )}
                name="countryOfOriginCode"
                control={control}
              />
            </SectionRow>
            <SectionRow>
              <Input
                label={<Label mandatory={!!mandatoryEntities?.manufacturerName}>Manufacturers Name and Address</Label>}
                errorMessage={errors?.manufacturerName?.message as string}
                disabled={!editableEntities?.manufacturerName || view}
                placeholder="Write manufacturers name and address"
                textarea
                {...register('manufacturerName')}
              />
            </SectionRow>
            {licenseTypeFeatureFlagsByCodeState.packageManagementEnabled && (
              <>
                <hr />
                <SectionRow>
                  <Input
                    label={<Label mandatory={!!mandatoryEntities?.packageNumber}>Package Number</Label>}
                    errorMessage={errors?.packageNumber?.message as string}
                    disabled={!editableEntities?.packageNumber || view}
                    placeholder="Write package number"
                    type="number"
                    {...register('packageNumber')}
                  />
                </SectionRow>
                <SectionRow>
                  <Controller
                    render={({ field }) => (
                      <Select
                        label={<Label mandatory={!!mandatoryEntities?.packageTypeCode}>Package Code</Label>}
                        options={createOptionsArrayFromData(packagesState, 'code', 'code', 'description')}
                        errorMessage={errors?.packageTypeCode?.message as string}
                        placeholder="Search package code"
                        isClearable
                        {...field}
                        disabled={!editableEntities?.packageTypeCode || view}
                      />
                    )}
                    name="packageTypeCode"
                    control={control}
                  />
                </SectionRow>
                <SectionRow>
                  <Input
                    label={<Label mandatory={!!mandatoryEntities?.packageMark}>Package Mark</Label>}
                    errorMessage={errors?.packageMark?.message as string}
                    disabled={!editableEntities?.packageMark || view}
                    placeholder="Write package mark"
                    {...register('packageMark')}
                  />
                </SectionRow>
              </>
            )}
            {licenseTypeFeatureFlagsByCodeState.itemWeightManagementEnabled && (
              <>
                <hr />
                <SectionRow>
                  <Input
                    label={
                      <div className={styles.currencyLabelContent}>
                        <Label mandatory={!!mandatoryEntities?.grossMass}>Gross Mass</Label>
                        <span>KGM</span>
                      </div>
                    }
                    errorMessage={errors?.grossMass?.message as string}
                    disabled={!editableEntities?.grossMass || view}
                    placeholder="Write number"
                    type="number"
                    min={0}
                    {...register('grossMass')}
                  />
                </SectionRow>
                <SectionRow>
                  <Input
                    label={
                      <div className={styles.currencyLabelContent}>
                        <Label mandatory={!!mandatoryEntities?.netMass}>Net Mass</Label>
                        <span>KGM</span>
                      </div>
                    }
                    errorMessage={errors?.netMass?.message as string}
                    disabled={!editableEntities?.netMass || view}
                    placeholder="Write number"
                    type="number"
                    min={0}
                    {...register('netMass')}
                  />
                </SectionRow>
              </>
            )}
            {licenseTypeFeatureFlagsByCodeState.invoiceValueManagementEnabled && (
              <>
                <hr />
                <SectionRow>
                  <Input
                    label={
                      <div className={styles.currencyLabelContent}>
                        <Label mandatory={!!mandatoryEntities?.itemInvoiceAmountInForeignCurrency}>
                          Invoice Value in Foreign Currency
                        </Label>
                        {invoiceCurrency && <span>{invoiceCurrency}</span>}
                      </div>
                    }
                    disabled={!editableEntities?.itemInvoiceAmountInForeignCurrency || view || !invoiceCurrency}
                    errorMessage={errors?.itemInvoiceAmountInForeignCurrency?.message as string}
                    placeholder="Write number"
                    type="number"
                    min={0}
                    {...register('itemInvoiceAmountInForeignCurrency')}
                  />
                </SectionRow>
                <SectionRow>
                  <Input
                    label={
                      <div className={styles.currencyLabelContent}>
                        <Label mandatory={!!mandatoryEntities?.itemInvoiceAmountInNationalCurrency}>
                          Invoice Value in National Currency
                        </Label>
                        <span>{NATIONAL_CURRENCY}</span>
                      </div>
                    }
                    errorMessage={errors?.itemInvoiceAmountInNationalCurrency?.message as string}
                    disabled={!editableEntities?.itemInvoiceAmountInNationalCurrency || view}
                    placeholder="Write number"
                    type="number"
                    min={0}
                    {...register('itemInvoiceAmountInNationalCurrency')}
                  />
                </SectionRow>
              </>
            )}
            <hr />
            <SectionRow>
              <Controller
                render={({ field }) => (
                  <Switcher
                    items={filterDataByPropNameInArray('id', licenseTypeByCodeState.enabledQuotas, quotaTypeItems)}
                    label={<Label mandatory={!!mandatoryEntities?.quotaType}>Quota Type</Label>}
                    disabled={!editableEntities?.quotaType || view}
                    onChange={field.onChange}
                    value={field.value}
                    color="success"
                  />
                )}
                control={control}
                name="quotaType"
              />
            </SectionRow>
            <SectionRow>
              <Input
                label={<Label mandatory={!!mandatoryEntities?.requestedAmount}>Requested Amount or Quantity</Label>}
                disabled={unLimitedQuotaType || !editableEntities?.requestedAmount || view}
                errorMessage={errors?.requestedAmount?.message as string}
                onWheel={(e: Record<string, any>) => e.target?.blur()}
                placeholder="Write requested amount or quantity"
                type="number"
                min={0}
                {...register('requestedAmount')}
              />
            </SectionRow>
            <SectionRow>
              <Input
                label={<Label mandatory={!!mandatoryEntities?.approvedAmount}>Approved Amount</Label>}
                errorMessage={errors?.approvedAmount?.message as string}
                disabled={!editableEntities?.approvedAmount || view}
                placeholder="Write approved amount"
                type="number"
                min={0}
                {...register('approvedAmount')}
              />
            </SectionRow>
            <SectionRow>
              <Input
                label={<Label mandatory={!!mandatoryEntities?.remainingAmount}>Remaining Amount</Label>}
                errorMessage={errors?.remainingAmount?.message as string}
                disabled={!editableEntities?.remainingAmount || view}
                placeholder="Write remaining amount"
                type="number"
                min={0}
                {...register('remainingAmount')}
              />
            </SectionRow>
          </SectionBody>
        </div>
        <div className={styles.content_footer}>
          <Button
            onClick={
              view
                ? handleClosePopup
                : (handleSubmit(
                    itemChangeMethod === ChangeMethods.EDIT
                      ? (handleUpdateItem as SubmitHandler<FieldValues>)
                      : (handleCreateItem as SubmitHandler<FieldValues>)
                  ) as MouseEventHandler)
            }
            disabled={!method}
            color="success"
          >
            {view
              ? LItemPopupContentViewTexts.POPUP_CLOSE_BUTTON_TEXT
              : itemChangeMethod === ChangeMethods.EDIT
              ? LItemPopupContentViewTexts.OPERATION_UPDATE_BUTTON_TEXT
              : LItemPopupContentViewTexts.OPERATION_ADD_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default LItemPopupContentView;
