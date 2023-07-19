import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { getDocumentHistory } from '../services/documentHistoryApiService';

import type { DocumentHistoryResponse } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getDocumentHistoryApi(action: ReturnType<typeof actions.getDocumentHistoryApi>) {
  const {
    payload: { documentId },
  } = action;

  try {
    const { data }: AxiosResponse<DocumentHistoryResponse> = yield call(getDocumentHistory, {
      documentId,
    });

    yield put(slicesActions.setDocumentHistoryData(data.versionListResponse));
  } catch (err) {
    console.error(err);
  }
}

export function* watchDocumentHistorySaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getDocumentHistoryApi.type, getDocumentHistoryApi);
}
