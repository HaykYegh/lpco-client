import { type FC, useCallback, useEffect, useState } from 'react';

import { type FieldValues, useForm, type UseFormReturn } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import type { EntityId } from '@reduxjs/toolkit';
import * as yup from 'yup';

import { useKeycloakContext } from '@wf/keycloak-axios-provider';
import { Icon, toasterEmitter } from '@wf/components';

import {
  defaultLicenseTypeByCode,
  defaultLicenseTypeFeatureFlagsByCode,
} from '../../../../store/licenseType/initialState';
import {
  licenseTypeByCodeSelector,
  licenseTypeFeatureFlagsByCodeSelector,
} from '../../../../store/licenseType/selectors';
import { getLicenseTypeByCodeApi, setLicenseType } from '../../../../store/licenseType/actions';
import { namesAndPartiesValidation } from '../../validationObjects/namesAndPartiesValidation';
import { licensePropsValidation } from '../../validationObjects/licensePropsValidation';
import { getSchemaObject, type IFields } from '../../../../helpers/getSchemaObject';
import { headerValidation } from '../../validationObjects/headerValidation';
import { licensePropsDefaultValues } from './licensePropsDefaultValues';
import ContentContainer from '../../../../components/ContentContainer';
import { getLicenseTypesApi } from '../../../Licenses/store/actions';
import { getSelectValue } from '../../../../helpers/getSelectValue';
import { errorsInOperation } from '../../utils/errorsInOperation';
import { useTypeInPath } from '../../../../hooks/useTypeInPath';
import { operationsAdapter } from '../../store/entityAdapters';
import LicenseTabView from '../../components/LicenseTabView';
import { StatusesList } from '../../../Licenses/store/types';
import { appPaths } from '../../../../constatnts/appPaths';
import { hasError } from '../../../../helpers/hasError';
import Header from '../../../../components/Header';
import LicenseTexts from './LicenseTexts';

import {
  type GetLicenseApiPayload,
  type IAttDocument,
  type IBeneficiaryItem,
  type IItemsItem,
  type IlicenseProps,
  type IOperation,
  LicenseModeItems,
} from '../../store/types';
import { TypeOfUse } from '../../constants';

import {
  licenseAttDocumentsSelector,
  licenseBeneficiariesSelector,
  licenseFeesSelector,
  licenseItemsSelector,
  licenseOperationsSelector,
  licensePropsEditableFieldsSelector,
  licensePropsMandatoryFieldsSelector,
  licensePropsSelector,
} from '../../store/selectors';
import { getLicenseApi, getUserReferenceNumberApi, sendLicenseApi } from '../../store/actions';
import { getDeclarantsApi } from '../../../../store/declarants/actions';
import { getDefaultLpcoData, setOperations } from '../../store/slices';
import { removeLastWordStartUnderline } from '../../../../helpers';
import { removeUpload } from '../../../../store/uploads/slices';
import { getLicenseHeaderActions } from '../../helpers';
import * as slicesActions from '../../store/slices';
import { ALL_DATA } from '../../../../constatnts';

import styles from './License.module.scss';

const getAppTitle = (type?: string) => {
  switch (type) {
    case LicenseModeItems.create:
      return LicenseTexts.LICENE_CREATE_TITLE_TEXT;
    case LicenseModeItems.edit:
      return LicenseTexts.LICENE_EDIT_TITLE_TEXT;
    default:
      return LicenseTexts.LICENE_VIEW_TITLE_TEXT;
  }
};

const License: FC = () => {
  const userInfo = useKeycloakContext()?.keycloak.tokenParsed;
  const declarantCode = userInfo?.DEC;
  const navigate = useNavigate();
  const [validationOptions, setValidationOptions] = useState({
    isHeaderWithError: false,
    isNamesAndPartiesWithError: false,
  });
  const { id } = useParams();
  const { type } = useTypeInPath(!id ? 1 : undefined);
  const [licenseCodeSearchValue, setLicenseSearchCode] = useState('');
  const [validObject, setValidObject] = useState({});
  const licensePropsValidationSchema = yup.object(validObject);
  const dispatch = useDispatch();

  const createMode = type === LicenseModeItems.create;

  const licensePropsState = useSelector(licensePropsSelector);
  const licenseOperationsState = useSelector(licenseOperationsSelector);
  const licenseTypeByCodeState = useSelector(licenseTypeByCodeSelector);
  const licenseTypeFeatureFlagsByCodeState = useSelector(licenseTypeFeatureFlagsByCodeSelector);
  const licenseFeesState = useSelector(licenseFeesSelector);
  const isLicenseFees = !!licenseFeesState.ids.length;
  const licenseTypeCodeValue = licenseTypeByCodeState.licenseTypeCode;
  const licenseTypeName = licenseTypeByCodeState.licenseTypeName;

  const beneficiariesState = useSelector(licenseBeneficiariesSelector);
  const attachedDocumentsState = useSelector(licenseAttDocumentsSelector);
  const itemsState = useSelector(licenseItemsSelector);

  const form = useForm({
    resolver: yupResolver(licensePropsValidationSchema),
    defaultValues: licensePropsDefaultValues,
  }) as unknown as UseFormReturn;

  const mandatoryFields = useSelector(licensePropsMandatoryFieldsSelector);
  const editableFields = useSelector(licensePropsEditableFieldsSelector);

  const {
    reset,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const isHeaderWithError = hasError(errors, headerValidation);
  const isNamesAndPartiesWithError = hasError(errors, namesAndPartiesValidation);

  const typeOfUse = createMode ? licenseTypeByCodeState.typeOfUse : licensePropsState.typeOfUse;
  const typeOfUseValue = TypeOfUse[typeOfUse as keyof typeof TypeOfUse];

  const getDefaultValues = useCallback(
    () => ({
      ...licensePropsState,
      typeOfUse: getSelectValue(typeOfUseValue, typeOfUseValue),
      countryOfDestinationCode: getSelectValue(
        licensePropsState.countryOfDestinationCode,
        licensePropsState.countryOfDestinationCode,
        { label: licensePropsState.countryOfDestinationName }
      ),
      licenseType: getSelectValue(licenseTypeCodeValue, licenseTypeCodeValue, {
        label: licenseTypeName as string,
      }),
      companyCode: getSelectValue(licensePropsState.companyCode, licensePropsState.companyCode, {
        label: licensePropsState.companyDescription,
      }),
      placeOfLoadingCode: getSelectValue(licensePropsState.placeOfLoadingCode, licensePropsState.placeOfLoadingCode, {
        label: licensePropsState.placeOfLoadingName as string,
      }),
      placeOfUnloadingCode: getSelectValue(
        licensePropsState.placeOfUnloadingCode,
        licensePropsState.placeOfUnloadingCode,
        { label: licensePropsState.placeOfUnloadingName }
      ),
      termsOfDeliveryCode: getSelectValue(
        licensePropsState.termsOfDeliveryCode,
        licensePropsState.termsOfDeliveryCode,
        { label: licensePropsState.termsOfDeliveryDescription }
      ),
      invoiceCurrencyCode: getSelectValue(
        licensePropsState.invoiceCurrencyCode,
        licensePropsState.invoiceCurrencyCode,
        { label: licensePropsState.invoiceExchangeRate as number }
      ),
      declarantCode: declarantCode ?? null,
    }),
    [licensePropsState, licenseTypeCodeValue, licenseTypeName, typeOfUseValue]
  );

  useEffect(() => {
    if (declarantCode !== ALL_DATA) {
      dispatch(getDeclarantsApi({ declarantCodeValue: declarantCode }));
    }
  }, [dispatch, declarantCode]);

  useEffect(() => {
    reset(getDefaultValues());
  }, [reset, getDefaultValues]);

  useEffect(() => {
    if (!createMode) {
      dispatch(getLicenseApi({ id } as GetLicenseApiPayload));
    } else {
      dispatch(getUserReferenceNumberApi());
    }
  }, [dispatch, id, createMode]);

  useEffect(() => {
    if (createMode) {
      dispatch(getLicenseTypesApi({ licenseTypeValue: licenseCodeSearchValue }));
    }
  }, [dispatch, licenseCodeSearchValue, createMode]);

  useEffect(() => {
    const schemaObject = getSchemaObject(mandatoryFields as IFields, licensePropsValidation, editableFields as IFields);
    setValidObject(schemaObject);
  }, [mandatoryFields, editableFields]);

  useEffect(() => {
    setValidationOptions({ isHeaderWithError, isNamesAndPartiesWithError });
  }, [isHeaderWithError, isNamesAndPartiesWithError]);

  useEffect(
    () => () => {
      dispatch(getDefaultLpcoData());
      dispatch(
        setLicenseType({
          licenseTypeByCodeParams: defaultLicenseTypeByCode,
          featureFlags: defaultLicenseTypeFeatureFlagsByCode,
          transitions: [],
          approvalsData: [],
          attachedDocuments: [],
          feesData: [],
          feesForExtendData: [],
        })
      );
      dispatch(setOperations([]));
      dispatch(removeUpload('attDocumentFile'));
    },
    [dispatch]
  );

  const handleLicenseCodeChange = useCallback(
    (value: string) => {
      setLicenseSearchCode(value);
    },
    [setLicenseSearchCode]
  );

  const handleLicenseChange = useCallback(
    (licenseTypeCode: string) => {
      dispatch(getLicenseTypeByCodeApi({ licenseTypeCode, withOperations: true }));
    },
    [dispatch]
  );

  const onSubmit = (data: FieldValues, name: string) => {
    const operation = name as EntityId;
    const operationsAdapterSelectors = operationsAdapter.getSelectors();
    const operationItem = operationsAdapterSelectors.selectById(
      licenseOperationsState,
      operation
    ) as unknown as IOperation;
    dispatch(slicesActions.setEditableFields(operationItem.editableFields));
    dispatch(slicesActions.setMandatoryFields(operationItem.mandatoryFields));
    const { hasErrors, beneficiaryErrors, attachedDocumentErrors, itemErrors } = errorsInOperation({
      licenseProps: data,
      beneficiariesState,
      attachedDocumentsState,
      itemsState,
      mandatoryFields: operationItem.mandatoryFields,
      operation,
    });

    if (!hasErrors) {
      dispatch(sendLicenseApi({ operation: operationItem, licenseProps: data as IlicenseProps, navigate, id }));
    } else {
      dispatch(
        slicesActions.setLicenseItemsErrors({
          beneficiariesWithErrors: beneficiaryErrors.fields as IBeneficiaryItem[],
          beneficiariesIds: beneficiaryErrors.ids,
          attachedDocumentsWithErrors: attachedDocumentErrors.fields as IAttDocument[],
          attachedDocumentsIds: attachedDocumentErrors.ids,
          itemsWithErrors: itemErrors.fields as IItemsItem[],
          itemsIds: itemErrors.ids,
        })
      );
      toasterEmitter({
        title: 'Error Message',
        status: 'error',
        description: 'there are some errors for create operation',
      });
      void trigger();
    }
  };

  const handleClick = (name: string) => handleSubmit((data: FieldValues) => onSubmit(data, name))();

  const status =
    StatusesList[licensePropsState.status as keyof typeof StatusesList] ??
    removeLastWordStartUnderline(licensePropsState.status);

  return (
    <div className={styles.container}>
      <div className={styles.header_content}>
        <Header
          actions={getLicenseHeaderActions({
            type,
            id,
            groupIds: licenseOperationsState.ids,
            handleSubmit: handleClick,
          })}
          title={<h2>{getAppTitle(type)}</h2>}
          link={appPaths.indexPath}
        />
        {!createMode && (
          <div className={styles.header_options}>
            <div className={styles.header_options_left}>
              <h3>Document Status:</h3>
              <span>{status}</span>
            </div>
            <div className={styles.header_options_right}>
              <Link to={`${appPaths.indexPath}documentHistory/${id as string}`} className={styles.options_link}>
                <Icon name="ic_time" />
                <span>Document History</span>
              </Link>
            </div>
          </div>
        )}
      </div>
      <ContentContainer>
        <LicenseTabView
          licenseTypeFeatureFlagsByCodeState={licenseTypeFeatureFlagsByCodeState}
          handleLicenseCodeChange={handleLicenseCodeChange}
          licenseTypeByCodeState={licenseTypeByCodeState}
          licenseCodeSearchValue={licenseCodeSearchValue}
          handleLicenseChange={handleLicenseChange}
          validationOptions={validationOptions}
          isLicenseFees={isLicenseFees}
          form={form}
        />
      </ContentContainer>
    </div>
  );
};

export default License;
