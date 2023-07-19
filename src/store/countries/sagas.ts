import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { CountriesType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getCountriesApi(action: ReturnType<typeof actions.getCountriesApi>) {
  const {
    payload: { countryCodeValue },
  } = action;

  try {
    const { data }: AxiosResponse<CountriesType> = yield call(rimmSearchService as unknown as SagaCallParamFuncType, {
      type: 'country',
      restrictBy: 'OR',
      restrictions: [
        {
          field: 'code',
          value: countryCodeValue,
          operator: Operators.STARTS_WITH,
        },
        {
          field: 'description',
          value: countryCodeValue,
          operator: Operators.STARTS_WITH,
        },
      ],
    });
    yield put(slicesActions.setCountriesData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchCountriesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getCountriesApi.type, getCountriesApi);
}
