import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { ExchangeRateType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getExchangeRateApi(action: ReturnType<typeof actions.getExchangeRateApi>) {
  const {
    payload: { exchangeRateSearchValue },
  } = action;

  try {
    const { data }: AxiosResponse<ExchangeRateType> = yield call(
      rimmSearchService as unknown as SagaCallParamFuncType,
      {
        type: 'exchangeRate',
        selectFields: ['code', 'description', 'rate'],
        restrictBy: 'OR',
        restrictions: [
          {
            field: 'code',
            value: exchangeRateSearchValue,
            operator: Operators.STARTS_WITH,
          },
          {
            field: 'description',
            value: exchangeRateSearchValue,
            operator: Operators.STARTS_WITH,
          },
        ],
      }
    );
    yield put(slicesActions.setExchangeRateData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchExchangeRateSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getExchangeRateApi.type, getExchangeRateApi);
}
