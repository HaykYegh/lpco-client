import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { CustomsOfficeType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getCustomsOfficeApi(action: ReturnType<typeof actions.getCustomsOfficeApi>) {
  const {
    payload: { customsOfficeSearchValue },
  } = action;

  try {
    const { data }: AxiosResponse<CustomsOfficeType> = yield call(
      rimmSearchService as unknown as SagaCallParamFuncType,
      {
        type: 'port',
        restrictBy: 'OR',
        restrictions: [
          {
            field: 'code',
            value: customsOfficeSearchValue,
            operator: Operators.STARTS_WITH,
          },
          {
            field: 'description',
            value: customsOfficeSearchValue,
            operator: Operators.STARTS_WITH,
          },
        ],
      }
    );
    yield put(slicesActions.setCustomsOfficeData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchCustomsOfficeSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getCustomsOfficeApi.type, getCustomsOfficeApi);
}
