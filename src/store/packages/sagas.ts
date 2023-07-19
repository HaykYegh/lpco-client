import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { PackageType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getPackagesApi(action: ReturnType<typeof actions.getPackagesApi>) {
  const {
    payload: { packageCodeValue },
  } = action;

  try {
    const { data }: AxiosResponse<PackageType> = yield call(rimmSearchService as unknown as SagaCallParamFuncType, {
      type: 'packageType',
      restrictBy: 'OR',
      max: 1000,
      restrictions: [
        {
          field: 'code',
          value: packageCodeValue,
          operator: Operators.STARTS_WITH,
        },
        {
          field: 'description',
          value: packageCodeValue,
          operator: Operators.STARTS_WITH,
        },
      ],
    });
    yield put(slicesActions.setPackagesData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchPackagesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getPackagesApi.type, getPackagesApi);
}
