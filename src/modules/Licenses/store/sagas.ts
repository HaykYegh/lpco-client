import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { getLicenses, getLicenseTypes } from '../services/licensesApiService';

import type { LicensesType, LicenseTypes } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getNewLicensesApi(action: ReturnType<typeof actions.getLicensesApi>) {
  const {
    payload: { limit, offset, statusValue, lpcoTypeValue, statusValues, selectFields },
  } = action;

  try {
    const { data }: AxiosResponse<LicensesType> = yield call(getLicenses as never, {
      limit,
      offset,
      statusValue,
      lpcoTypeValue,
      statusValues,
      selectFields,
    });

    yield put(slicesActions.setNewLicensesData(data.resultList));
    yield put(slicesActions.setNewLicensesCount(data.totalCount));
  } catch (err) {
    console.error(err);
  }
}

function* getLicensesApi(action: ReturnType<typeof actions.getLicensesApi>) {
  const {
    payload: { limit, offset, statusValue, lpcoTypeValue, statusValues, selectFields },
  } = action;

  try {
    const { data }: AxiosResponse<LicensesType> = yield call(getLicenses as never, {
      limit,
      offset,
      statusValue,
      lpcoTypeValue,
      statusValues,
      selectFields,
    });

    yield put(slicesActions.setLicensesData(data.resultList));
    yield put(slicesActions.setLicensesCount(data.totalCount));
  } catch (err) {
    console.error(err);
  }
}

function* getLicenseTypesApi(action: ReturnType<typeof actions.getLicenseTypesApi>) {
  const {
    payload: { licenseTypeValue },
  } = action;

  try {
    const { data }: AxiosResponse<LicenseTypes> = yield call(getLicenseTypes, {
      licenseTypeValue,
    });

    yield put(slicesActions.setLicensesSearchData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchLicensesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getNewLicensesApi.type, getNewLicensesApi);
  yield takeLatest(actions.getLicensesApi.type, getLicensesApi);
  yield takeLatest(actions.getLicenseTypesApi.type, getLicenseTypesApi);
}
