import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { CompanyType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getCompaniesApi(action: ReturnType<typeof actions.getCompaniesApi>) {
  const {
    payload: { companyCodeValue },
  } = action;

  try {
    const { data }: AxiosResponse<CompanyType> = yield call(rimmSearchService as unknown as SagaCallParamFuncType, {
      type: 'company',
      selectFields: ['code', 'description', 'address1', 'address2', 'phoneNumber', 'email'],
      restrictBy: 'OR',
      restrictions: [
        {
          field: 'code',
          value: companyCodeValue,
          operator: Operators.STARTS_WITH,
        },
        {
          field: 'description',
          value: companyCodeValue,
          operator: Operators.STARTS_WITH,
        },
      ],
    });
    yield put(slicesActions.setCompaniesData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchCompaniesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getCompaniesApi.type, getCompaniesApi);
}
