import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { TermsOfDeliveryType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getTermsOfDeliveryApi(action: ReturnType<typeof actions.getTermsOfDeliveryApi>) {
  const {
    payload: { termsOfDeliverySearchValue },
  } = action;

  try {
    const { data }: AxiosResponse<TermsOfDeliveryType> = yield call(
      rimmSearchService as unknown as SagaCallParamFuncType,
      {
        type: 'termsOfDelivery',
        restrictBy: 'OR',
        restrictions: [
          {
            field: 'code',
            value: termsOfDeliverySearchValue,
            operator: Operators.STARTS_WITH,
          },
          {
            field: 'description',
            value: termsOfDeliverySearchValue,
            operator: Operators.STARTS_WITH,
          },
        ],
      }
    );
    yield put(slicesActions.setTermsOfDeliveryData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchTermsOfDeliverySaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getTermsOfDeliveryApi.type, getTermsOfDeliveryApi);
}
