import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Operators } from '../../@types/serviceTypes';

import { rimmSearchService } from '../../services/rimmSearchService';

import type { AttachmentType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getAttachmentsApi(action: ReturnType<typeof actions.getAttachmentsApi>) {
  const {
    payload: { attDocumentCodeValue },
  } = action;

  try {
    const { data }: AxiosResponse<AttachmentType> = yield call(rimmSearchService as unknown as SagaCallParamFuncType, {
      type: 'attachedDocument',
      restrictBy: 'OR',
      max: 1000,
      restrictions: [
        {
          field: 'code',
          value: attDocumentCodeValue,
          operator: Operators.STARTS_WITH,
        },
        {
          field: 'description',
          value: attDocumentCodeValue,
          operator: Operators.STARTS_WITH,
        },
      ],
    });
    yield put(slicesActions.setAttachmentsData(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchAttachmentsSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getAttachmentsApi.type, getAttachmentsApi);
}
