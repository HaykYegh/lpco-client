import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { DeclarantType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getDeclarantsApi(action: ReturnType<typeof actions.getDeclarantsApi>) {
  const {
    payload: { declarantCodeValue },
  } = action;

  try {
    const { data }: AxiosResponse<DeclarantType> = yield call(rimmSearchService as unknown as SagaCallParamFuncType, {
      type: 'declarant',
      selectFields: ['code', 'description'],
      max: 1000,
      restrictions: [
        {
          field: 'code',
          value: declarantCodeValue,
          operator: Operators.EQUALS,
        },
      ],
    });
    yield put(slicesActions.setDeclarantsData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchDeclarantsSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getDeclarantsApi.type, getDeclarantsApi);
}
