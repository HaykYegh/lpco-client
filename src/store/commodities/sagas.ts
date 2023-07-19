import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { CommodityType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getCommoditiesApi(action: ReturnType<typeof actions.getCommoditiesApi>) {
  const {
    payload: { commodityCodeValue },
  } = action;

  try {
    const { data }: AxiosResponse<CommodityType> = yield call(rimmSearchService as unknown as SagaCallParamFuncType, {
      type: 'commodity',
      restrictBy: 'OR',
      restrictions: [
        {
          field: 'code',
          value: commodityCodeValue,
          operator: Operators.STARTS_WITH,
        },
        {
          field: 'description',
          value: commodityCodeValue,
          operator: Operators.CONTAINS,
        },
      ],
    });
    yield put(slicesActions.setCommoditiesData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchCommoditiesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getCommoditiesApi.type, getCommoditiesApi);
}
