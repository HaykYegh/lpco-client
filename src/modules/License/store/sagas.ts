import { call, type ForkEffect, put, select, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { toasterEmitter } from '@wf/components';

import type { GetLicenseTypeApiPayload, ILicenseTypeByCodeProps } from '../../../store/licenseType/types';
import { licenseTypeByCodeSelector } from '../../../store/licenseType/selectors';
import { getLicenseTypeByCodeApi } from '../../../store/licenseType/actions';
import { licenseDataCollector } from '../utils/licenseDataCollector';
import { errorsGenerator } from '../../../helpers/errorsGenerator';
import { appPaths } from '../../../constatnts/appPaths';

import { editOperation, getLicense, getUserReferenceNumber, sendOperation } from '../services/licenseApiService';

import { OGA_UPDATE, OperationTypes, statusesDepandsOperation } from '../constants';

import type { IAttDocumentEntityProps, IBeneficiaryItemEntityProps, IItemsItemEntityProps, ILpcoData } from './types';
import { licenseAttDocumentsSelector, licenseBeneficiariesSelector, licenseItemsSelector } from './selectors';
import { createEditableAndMandatoryFields, createOperationsArray } from '../helpers';
import * as slicesActions from './slices';
import * as actions from './actions';

function* changeOperations(action: ReturnType<typeof actions.changeOperations>) {
  const {
    payload: { configs },
  } = action;

  try {
    const operations = createOperationsArray(configs);
    const editableAndMandatoryFields = createEditableAndMandatoryFields(operations);
    yield put(slicesActions.setOperations(operations));
    yield put(slicesActions.setEditableFields(editableAndMandatoryFields.editableFields));
    yield put(slicesActions.setMandatoryFields(editableAndMandatoryFields.mandatoryFields));
  } catch (err) {
    console.error(err);
  }
}

function* getLicenseApi(action: ReturnType<typeof actions.getLicenseApi>) {
  const {
    payload: { id },
  } = action;

  try {
    const {
      data: {
        lpcoResponse: { items, attachedDocuments, beneficiaries, fees, ...licenseProps },
        configs: { operations, subDocs },
      },
    }: AxiosResponse<ILpcoData> = yield call(getLicense as unknown as SagaCallParamFuncType, {
      id,
    });

    yield put(slicesActions.setLicensePropsById(licenseProps));
    yield put(slicesActions.setLicenseItems(items));
    yield put(slicesActions.setLicenseAttachedDocuments(attachedDocuments));
    yield put(slicesActions.setLicenseBeneficiaries(beneficiaries));
    yield put(slicesActions.setLicenseFees(fees));
    const licenseTypeCode = licenseProps.licenseTypeId;
    yield put(actions.changeOperations({ configs: operations }));
    yield put(slicesActions.setOperationsSubDocs(subDocs));
    yield put(getLicenseTypeByCodeApi({ licenseTypeCode, withId: true } as GetLicenseTypeApiPayload));
  } catch (err) {
    console.error(err);
  }
}

function* getUserReferenceNumberApi(): Record<string, any> {
  try {
    const { data }: Record<string, unknown> = yield call(getUserReferenceNumber);

    yield put(slicesActions.setLicenseUserReferenceNumber(data as string));
  } catch (err) {
    console.error(err);
  }
}

function* sendLicenseApi(action: ReturnType<typeof actions.sendLicenseApi>) {
  const {
    payload: {
      operation: { editableFields, name },
      licenseProps,
      navigate,
      id,
    },
  } = action;

  try {
    const beneficiariesState: IBeneficiaryItemEntityProps = yield select(licenseBeneficiariesSelector);
    const attachedDocumentsState: IAttDocumentEntityProps = yield select(licenseAttDocumentsSelector);
    const itemsState: IItemsItemEntityProps = yield select(licenseItemsSelector);
    const licenseTypeByCodeStete: ILicenseTypeByCodeProps = yield select(licenseTypeByCodeSelector);
    const operationName = OperationTypes[name as keyof typeof OperationTypes];

    const licenseData = licenseDataCollector({
      beneficiariesState,
      attachedDocumentsState,
      itemsState,
      licenseTypeByCodeStete,
      licenseProps,
      editableFieldsEntities: editableFields.entities,
    });

    const operationRequest = id ? editOperation : sendOperation;

    const { data } = yield call(operationRequest as unknown as SagaCallParamFuncType, {
      operation: operationName ? name : OGA_UPDATE,
      data: licenseData,
      id,
    }) as unknown as SagaCallParamFuncType;

    if (data) {
      const prop = operationName ? name : OGA_UPDATE;
      toasterEmitter({
        title: 'Info Message',
        status: 'success',
        description: `${operationName ?? name} ${
          statusesDepandsOperation[prop as keyof typeof statusesDepandsOperation]
        } successfully`,
      });
      navigate(appPaths.indexPath);
    }
  } catch (errors) {
    errorsGenerator(errors as Array<IErrorItem>);
    console.error(errors);
  }
}

export function* watchLicenseSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getLicenseApi.type, getLicenseApi);
  yield takeLatest(actions.changeOperations.type, changeOperations);
  yield takeLatest(actions.getUserReferenceNumberApi.type, getUserReferenceNumberApi);
  yield takeLatest(actions.sendLicenseApi.type, sendLicenseApi);
}
