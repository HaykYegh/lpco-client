import { useEffect } from 'react';

import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { DatePicker, Input, Select } from '@wf/components';

import { createOptionsArrayFromData } from '../../../../helpers/createOptionsArrayFromData';
import { itemsAdapter, itemsWithErrorsAdapter } from '../../store/entityAdapters';
import RightItemWithTwoField from '../../../../components/RightItemWithTwoField';
import RightItemWithOneField from '../../../../components/RightItemWithOneField';
import TabContentSection from '../../../../components/TabContentSection';
import type { ILicenseHeaderViewProps } from './LicenseHeaderViewTypes';
import RowWithOneField from '../../../../components/RowWithOneField';
import { useTypeInPath } from '../../../../hooks/useTypeInPath';
import FieldContent from '../../../../components/FieldContent';
import SectionBody from '../../../../components/SectionBody';
import TabContent from '../../../../components/TabContent';
import SectionRow from '../../../../components/SectionRow';
import Label from '../../../../components/Label';

import { LicenseModeItems, licensePropsEnum } from '../../store/types';

import { licenseItemsSelector, licenseItemsWithErrorsSelector } from '../../store/selectors';
import { getTotalInvoiceValue } from '../../helpers';
import { typeOfUseItems } from '../../options';

import styles from './LicenseHeaderView.module.scss';

const LicenseHeaderView: FC<ILicenseHeaderViewProps> = ({
  form,
  relatedProductsEnabled,
  relatedProducts,
  flowEnabled,
  flow,
  countryOfExportOrImportEnabled,
  typeOfUseEnabled,
  licenseCodeSearchValue,
  licensesSearchState,
  countriesState,
  handleLicenseCodeChange,
  handleLicenseChange,
  licenseMandatoryFieldsState,
  licenseEditableFieldsState,
  placeOfLoadingEnabled,
  placeOfUnloadingEnabled,
  invoiceValueManagementEnabled,
  termOfDeliveryEnabled,
  handlePlaceIfLoadingFocus,
  customsOfficeState,
  handleChangeCustomOfficeData,
  handleTermsOfDeliveryFocus,
  handleChangeTermsOfDeliveryData,
  termsOfDeliveryState,
  handleExchangeRateFocus,
  handleChangeExchangeRateData,
  exchangeRateState,
}) => {
  const { id } = useParams();
  const { type } = useTypeInPath(!id ? 1 : undefined);

  const viewMode = type === LicenseModeItems.view;
  const createMode = type === LicenseModeItems.create;

  const lpcoMandatory = licenseMandatoryFieldsState?.lpco?.entities;
  const lpcoEditable = licenseEditableFieldsState?.lpco?.entities;

  const isLicenseTypeMandatory = !!lpcoMandatory?.[licensePropsEnum.licenseType];
  const isRelatedProductsMandatory = !!lpcoMandatory?.[licensePropsEnum.relatedProducts];
  const isFlowMandatory = !!lpcoMandatory?.[licensePropsEnum.flow];
  const isUserReferenceNumberMandatory = !!lpcoMandatory?.[licensePropsEnum.userReferenceNumber];
  const isRequestNumberMandatory = !!lpcoMandatory?.[licensePropsEnum.requestNumber];
  const isRequestDateMandatory = !!lpcoMandatory?.[licensePropsEnum.requestDate];
  const isApprovalReferenceMandatory = !!lpcoMandatory?.[licensePropsEnum.approvalReference];
  const isValidFromMandatory = !!lpcoMandatory?.[licensePropsEnum.validFrom];
  const isValidToMandatory = !!lpcoMandatory?.[licensePropsEnum.validTo];
  const isApprovalDateMandatory = !!lpcoMandatory?.[licensePropsEnum.approvalDate];
  const isCountryOfDestinationCodeMandatory = !!lpcoMandatory?.[licensePropsEnum.countryOfDestinationCode];
  const isTypeOfUseMandatory = !!lpcoMandatory?.[licensePropsEnum.typeOfUse];
  const isPlaceOfLoadingMandatory = !!lpcoMandatory?.[licensePropsEnum.placeOfLoadingCode];
  const isPlaceOfUnLoadingMandatory = !!lpcoMandatory?.[licensePropsEnum.placeOfUnloadingCode];
  const termsOfDeliveryMandatory = !!lpcoMandatory?.[licensePropsEnum.termsOfDeliveryCode];
  const invoiceCurrencyCodeMandatory = !!lpcoMandatory?.[licensePropsEnum.invoiceCurrencyCode];
  const invoiceAmountInForeignCurrencyMandatory = !!lpcoMandatory?.[licensePropsEnum.invoiceAmountInForeignCurrency];
  const invoiceAmountInNationalCurrencyMandatory = !!lpcoMandatory?.[licensePropsEnum.invoiceAmountInNationalCurrency];

  const countryAndTypeOfUseDisabled = !countryOfExportOrImportEnabled && !typeOfUseEnabled;

  const itemsAdapterSelectors = itemsAdapter.getSelectors();
  const itemsData = useSelector(licenseItemsSelector);
  const allItems = itemsAdapterSelectors.selectAll(itemsData);

  const itemsWithErrorsAdapterSelectors = itemsWithErrorsAdapter.getSelectors();
  const itemsWithErrorsData = useSelector(licenseItemsWithErrorsSelector);
  const allItemsWithErrors = itemsWithErrorsAdapterSelectors.selectAll(itemsWithErrorsData);

  const totalValue = getTotalInvoiceValue([...allItems, ...allItemsWithErrors]);

  const {
    control,
    formState: { errors },
    register,
    watch,
    setValue,
  } = form;

  const invoiceCurrencyCode = watch(licensePropsEnum.invoiceCurrencyCode);
  const invoiceCurrencyCodeValue = Number(invoiceCurrencyCode?.tag?.label);
  const formRelatedProducts = watch(licensePropsEnum.relatedProducts);
  const relatedProductsValue = formRelatedProducts ?? relatedProducts;
  const formFlow = watch(licensePropsEnum.flow);
  const flowValue = formFlow ?? flow;

  const countryTextName = flowValue === 'EX' ? 'Destination' : 'Export';

  useEffect(() => {
    setValue('invoiceAmountInForeignCurrency', invoiceCurrencyCodeValue ? totalValue || null : null);
    setValue('invoiceAmountInNationalCurrency', totalValue * invoiceCurrencyCodeValue || null);
  }, [setValue, totalValue, invoiceCurrencyCodeValue]);

  return (
    <TabContent>
      <TabContentSection>
        <SectionBody>
          <SectionRow>
            <div className={styles.licenseInfoContent}>
              <FieldContent
                label={<Label mandatory={isLicenseTypeMandatory}>Type of LPCO</Label>}
                textContent={watch(licensePropsEnum.licenseType)?.label}
                viewMode={viewMode}
              >
                <Controller
                  render={({ field }) => (
                    <Select
                      options={createOptionsArrayFromData(
                        licensesSearchState,
                        'licenseTypeCode',
                        'licenseTypeCode',
                        'licenseTypeName'
                      )}
                      errorMessage={errors?.[licensePropsEnum.licenseType]?.message as string}
                      label={<Label mandatory={isLicenseTypeMandatory}>Type of LPCO</Label>}
                      placeholder="Choose license type"
                      isClearable
                      {...field}
                      onChange={(selected: OptionsItemType) => {
                        field.onChange(selected);
                        handleLicenseChange(selected?.value);
                      }}
                      onInputChange={handleLicenseCodeChange}
                      inputValue={licenseCodeSearchValue}
                      disabled={!createMode}
                    />
                  )}
                  name={licensePropsEnum.licenseType}
                  control={control}
                />
              </FieldContent>
              <FieldContent
                label={<Label mandatory={isUserReferenceNumberMandatory}>User Reference Number</Label>}
                textContent={watch(licensePropsEnum.userReferenceNumber)}
                viewMode={viewMode}
              >
                <Input
                  label={<Label mandatory={isUserReferenceNumberMandatory}>User Reference Number</Label>}
                  errorMessage={errors?.[licensePropsEnum.userReferenceNumber]?.message as string}
                  disabled={!lpcoEditable?.[licensePropsEnum.userReferenceNumber]}
                  placeholder="Write User Reference Number"
                  {...register(licensePropsEnum.userReferenceNumber)}
                />
              </FieldContent>
            </div>
            <RightItemWithTwoField className={!relatedProductsEnabled || !flowEnabled ? 'withAfter' : undefined}>
              <FieldContent
                label={<Label mandatory={isFlowMandatory}>Flow</Label>}
                textContent={flowValue}
                enabled={flowEnabled}
                viewMode={viewMode}
              >
                <Input
                  label={<Label mandatory={isFlowMandatory}>Flow</Label>}
                  placeholder="Flow"
                  value={flowValue}
                  disabled={true}
                />
              </FieldContent>
              <FieldContent
                label={<Label mandatory={isRelatedProductsMandatory}>Related Products</Label>}
                textContent={relatedProductsValue}
                enabled={relatedProductsEnabled}
                viewMode={viewMode}
              >
                <Input
                  label={<Label mandatory={isRelatedProductsMandatory}>Related Products</Label>}
                  placeholder="Related Products"
                  value={relatedProductsValue}
                  disabled={true}
                  textarea
                />
              </FieldContent>
            </RightItemWithTwoField>
          </SectionRow>
          <hr />
          <SectionRow>
            <FieldContent
              label={<Label mandatory={isRequestNumberMandatory}>Request Number</Label>}
              textContent={watch(licensePropsEnum.requestNumber)}
              viewMode={viewMode}
            >
              <Input
                errorMessage={errors?.[licensePropsEnum.requestNumber]?.message as string}
                disabled={!lpcoEditable?.[licensePropsEnum.requestNumber]}
                label={<Label>Request Number</Label>}
                placeholder="Request number text"
                {...register(licensePropsEnum.requestNumber)}
              />
            </FieldContent>
            <RightItemWithOneField>
              <FieldContent
                textContent={watch(licensePropsEnum.requestDate)}
                label={<Label>Request Date</Label>}
                viewMode={viewMode}
              >
                <Controller
                  render={({ field }) => (
                    <DatePicker
                      errorMessage={errors?.[licensePropsEnum.requestDate]?.message as string}
                      label={<Label mandatory={isRequestDateMandatory}>Request Date</Label>}
                      disabled={!lpcoEditable?.[licensePropsEnum.requestDate]}
                      className={styles.date_picker}
                      placeholderText="Request date"
                      isClearable={false}
                      {...field}
                      ref={(ref) => {
                        field.ref({
                          focus: ref?.setFocus,
                        });
                      }}
                    />
                  )}
                  name={licensePropsEnum.requestDate}
                  control={control}
                />
              </FieldContent>
            </RightItemWithOneField>
          </SectionRow>
          <SectionRow>
            <FieldContent
              label={<Label mandatory={isApprovalReferenceMandatory}>Approval Reference</Label>}
              textContent={watch(licensePropsEnum.approvalReference)}
              viewMode={viewMode}
            >
              <Input
                errorMessage={errors?.[licensePropsEnum.approvalReference]?.message as string}
                disabled={!lpcoEditable?.[licensePropsEnum.approvalReference]}
                label={<Label>Approval Reference</Label>}
                placeholder="Approval reference text"
                {...register(licensePropsEnum.approvalReference)}
              />
            </FieldContent>
            <RightItemWithOneField>
              <FieldContent
                textContent={watch(licensePropsEnum.approvalDate)}
                label={<Label>Approval Date</Label>}
                viewMode={viewMode}
              >
                <Controller
                  render={({ field }) => (
                    <DatePicker
                      errorMessage={errors?.[licensePropsEnum.approvalDate]?.message as string}
                      label={<Label mandatory={isApprovalDateMandatory}>Approval Date</Label>}
                      disabled={!lpcoEditable?.[licensePropsEnum.approvalDate]}
                      placeholderText="Approval date"
                      className={styles.date_picker}
                      isClearable={false}
                      {...field}
                      ref={(ref) => {
                        field.ref({
                          focus: ref?.setFocus,
                        });
                      }}
                    />
                  )}
                  name={licensePropsEnum.approvalDate}
                  control={control}
                />
              </FieldContent>
            </RightItemWithOneField>
          </SectionRow>
          <SectionRow>
            <FieldContent
              label={<Label mandatory={isValidFromMandatory}>Valid From</Label>}
              textContent={watch(licensePropsEnum.validFrom)}
              viewMode={viewMode}
            >
              <Controller
                render={({ field }) => (
                  <DatePicker
                    errorMessage={errors?.[licensePropsEnum.validFrom]?.message as string}
                    label={<Label mandatory={isValidFromMandatory}>Valid From</Label>}
                    disabled={!lpcoEditable?.[licensePropsEnum.validFrom]}
                    placeholderText="Valid from date"
                    className={styles.date_picker}
                    isClearable={false}
                    {...field}
                    ref={(ref) => {
                      field.ref({
                        focus: ref?.setFocus,
                      });
                    }}
                  />
                )}
                name={licensePropsEnum.validFrom}
                control={control}
              />
            </FieldContent>
            <RightItemWithOneField>
              <FieldContent
                label={<Label mandatory={isValidToMandatory}>Valid To</Label>}
                textContent={watch(licensePropsEnum.validTo)}
                viewMode={viewMode}
              >
                <Controller
                  render={({ field }) => (
                    <DatePicker
                      errorMessage={errors?.[licensePropsEnum.validTo]?.message as string}
                      label={<Label mandatory={isValidToMandatory}>Valid To</Label>}
                      disabled={!lpcoEditable?.[licensePropsEnum.validTo]}
                      placeholderText="Valid to date"
                      className={styles.date_picker}
                      isClearable={false}
                      {...field}
                      ref={(ref) => {
                        field.ref({
                          focus: ref?.setFocus,
                        });
                      }}
                    />
                  )}
                  name={licensePropsEnum.validTo}
                  control={control}
                />
              </FieldContent>
            </RightItemWithOneField>
          </SectionRow>
          {!countryAndTypeOfUseDisabled && (
            <>
              <hr />
              {countryOfExportOrImportEnabled && (
                <RowWithOneField>
                  <FieldContent
                    label={
                      <Label mandatory={isCountryOfDestinationCodeMandatory}>{`Country of ${countryTextName}`}</Label>
                    }
                    textContent={watch(licensePropsEnum.countryOfDestinationCode)?.label}
                    viewMode={viewMode}
                  >
                    <Controller
                      render={({ field }) => (
                        <Select
                          label={
                            <Label
                              mandatory={isCountryOfDestinationCodeMandatory}
                            >{`Country of ${countryTextName}`}</Label>
                          }
                          errorMessage={errors?.[licensePropsEnum.countryOfDestinationCode]?.message as string}
                          options={createOptionsArrayFromData(countriesState, 'code', 'code', 'description')}
                          placeholder="Choose country code"
                          isClearable
                          {...field}
                          disabled={!lpcoEditable?.[licensePropsEnum.countryOfDestinationCode]}
                        />
                      )}
                      name={licensePropsEnum.countryOfDestinationCode}
                      control={control}
                    />
                  </FieldContent>
                </RowWithOneField>
              )}
              {typeOfUseEnabled && (
                <RowWithOneField>
                  <FieldContent
                    label={<Label mandatory={isTypeOfUseMandatory}>Type of Use</Label>}
                    textContent={watch(licensePropsEnum.typeOfUse)?.label}
                    viewMode={viewMode}
                  >
                    <Controller
                      render={({ field }) => (
                        <Select
                          errorMessage={errors?.[licensePropsEnum.typeOfUse]?.message as string}
                          options={createOptionsArrayFromData(typeOfUseItems, 'label', 'value')}
                          label={<Label mandatory={isTypeOfUseMandatory}>Type of Use</Label>}
                          disabled={!lpcoEditable?.[licensePropsEnum.typeOfUse]}
                          placeholder="Choose type of use"
                          isClearable
                          {...field}
                        />
                      )}
                      name={licensePropsEnum.typeOfUse}
                      control={control}
                    />
                  </FieldContent>
                </RowWithOneField>
              )}
            </>
          )}
          {(termOfDeliveryEnabled || invoiceValueManagementEnabled) && <hr />}
          {(termOfDeliveryEnabled || invoiceValueManagementEnabled) && (
            <SectionRow>
              <FieldContent
                label={<Label mandatory={termsOfDeliveryMandatory}>Terms of Delivery</Label>}
                textContent={watch(licensePropsEnum.termsOfDeliveryCode)?.label}
                enabled={termOfDeliveryEnabled}
                viewMode={viewMode}
              >
                <Controller
                  render={({ field }) => (
                    <Select
                      options={createOptionsArrayFromData(termsOfDeliveryState, 'code', 'code', 'description')}
                      errorMessage={errors?.[licensePropsEnum.termsOfDeliveryCode]?.message as string}
                      label={<Label mandatory={termsOfDeliveryMandatory}>Terms of Delivery</Label>}
                      disabled={!lpcoEditable?.[licensePropsEnum.termsOfDeliveryCode]}
                      placeholder="Choose terms of delivery"
                      isClearable
                      {...field}
                      onInputChange={handleChangeTermsOfDeliveryData}
                      onFocus={handleTermsOfDeliveryFocus}
                    />
                  )}
                  name={licensePropsEnum.termsOfDeliveryCode}
                  control={control}
                />
              </FieldContent>
              <RightItemWithOneField className={!termOfDeliveryEnabled ? 'onlyOneField' : ''}>
                <FieldContent
                  label={<Label mandatory={invoiceCurrencyCodeMandatory}>Invoice Currency Code</Label>}
                  textContent={watch(licensePropsEnum.invoiceCurrencyCode)?.label}
                  enabled={invoiceValueManagementEnabled}
                  viewMode={viewMode}
                >
                  <Controller
                    render={({ field }) => (
                      <Select
                        label={<Label mandatory={invoiceCurrencyCodeMandatory}>Invoice Currency Code</Label>}
                        errorMessage={errors?.[licensePropsEnum.invoiceCurrencyCode]?.message as string}
                        options={createOptionsArrayFromData(exchangeRateState, 'code', 'code', 'rate')}
                        disabled={!lpcoEditable?.[licensePropsEnum.invoiceCurrencyCode]}
                        placeholder="Choose invoice currency code"
                        {...field}
                        onInputChange={handleChangeExchangeRateData}
                        onFocus={handleExchangeRateFocus}
                      />
                    )}
                    name={licensePropsEnum.invoiceCurrencyCode}
                    control={control}
                  />
                </FieldContent>
              </RightItemWithOneField>
            </SectionRow>
          )}
          {invoiceValueManagementEnabled && (
            <SectionRow>
              <FieldContent
                label={
                  <Label mandatory={invoiceAmountInForeignCurrencyMandatory}>Invoice Value in Foreign Currency</Label>
                }
                textContent={watch(licensePropsEnum.invoiceAmountInForeignCurrency)?.label}
                viewMode={viewMode}
              >
                <Input
                  label={
                    <Label mandatory={invoiceAmountInForeignCurrencyMandatory}>Invoice Value in Foreign Currency</Label>
                  }
                  errorMessage={errors?.[licensePropsEnum.invoiceAmountInForeignCurrency]?.message as string}
                  disabled={!lpcoEditable?.[licensePropsEnum.invoiceAmountInForeignCurrency]}
                  placeholder="Write invoice value in foreign currency"
                  type="number"
                  {...register(licensePropsEnum.invoiceAmountInForeignCurrency)}
                />
              </FieldContent>
              <RightItemWithOneField>
                <FieldContent
                  label={
                    <Label mandatory={invoiceAmountInNationalCurrencyMandatory}>
                      Invoice Value in National Currency
                    </Label>
                  }
                  textContent={watch(licensePropsEnum.invoiceAmountInNationalCurrency)?.label}
                  viewMode={viewMode}
                >
                  <Input
                    label={
                      <Label mandatory={invoiceAmountInNationalCurrencyMandatory}>
                        Invoice Value in National Currency
                      </Label>
                    }
                    errorMessage={errors?.[licensePropsEnum.invoiceAmountInNationalCurrency]?.message as string}
                    disabled={!lpcoEditable?.[licensePropsEnum.invoiceAmountInNationalCurrency]}
                    placeholder="Write invoice value in national currency"
                    type="number"
                    {...register(licensePropsEnum.invoiceAmountInNationalCurrency)}
                  />
                </FieldContent>
              </RightItemWithOneField>
            </SectionRow>
          )}
          {(placeOfLoadingEnabled || placeOfUnloadingEnabled) && <hr />}
          {(placeOfLoadingEnabled || placeOfUnloadingEnabled) && (
            <SectionRow>
              <FieldContent
                label={<Label mandatory={isPlaceOfLoadingMandatory}>Place of Loading</Label>}
                textContent={watch(licensePropsEnum.placeOfLoadingCode)?.label}
                enabled={placeOfLoadingEnabled}
                viewMode={viewMode}
              >
                <Controller
                  render={({ field }) => (
                    <Select
                      options={createOptionsArrayFromData(customsOfficeState, 'code', 'code', 'description')}
                      errorMessage={errors?.[licensePropsEnum.placeOfLoadingCode]?.message as string}
                      label={<Label mandatory={isPlaceOfLoadingMandatory}>Place of Loading</Label>}
                      disabled={!lpcoEditable?.[licensePropsEnum.placeOfLoadingCode]}
                      placeholder="Choose place of loading"
                      isClearable
                      {...field}
                      onInputChange={handleChangeCustomOfficeData}
                      onFocus={handlePlaceIfLoadingFocus}
                    />
                  )}
                  name={licensePropsEnum.placeOfLoadingCode}
                  control={control}
                />
              </FieldContent>
              <RightItemWithOneField className={!placeOfLoadingEnabled ? 'onlyOneField' : ''}>
                <FieldContent
                  label={<Label mandatory={isPlaceOfUnLoadingMandatory}>Place of Unloading</Label>}
                  textContent={watch(licensePropsEnum.placeOfUnloadingCode)?.label}
                  enabled={placeOfUnloadingEnabled}
                  viewMode={viewMode}
                >
                  <Controller
                    render={({ field }) => (
                      <Select
                        options={createOptionsArrayFromData(customsOfficeState, 'code', 'code', 'description')}
                        errorMessage={errors?.[licensePropsEnum.placeOfUnloadingCode]?.message as string}
                        label={<Label mandatory={isPlaceOfUnLoadingMandatory}>Place of Unloading</Label>}
                        disabled={!lpcoEditable?.[licensePropsEnum.placeOfUnloadingCode]}
                        placeholder="Choose place of unloading"
                        isClearable
                        {...field}
                        onInputChange={handleChangeCustomOfficeData}
                        onFocus={handlePlaceIfLoadingFocus}
                      />
                    )}
                    name={licensePropsEnum.placeOfUnloadingCode}
                    control={control}
                  />
                </FieldContent>
              </RightItemWithOneField>
            </SectionRow>
          )}
        </SectionBody>
      </TabContentSection>
    </TabContent>
  );
};

export default LicenseHeaderView;
