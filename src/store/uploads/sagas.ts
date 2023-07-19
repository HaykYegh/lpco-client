import { call, type ForkEffect, put, select, takeLatest } from 'redux-saga/effects';
import type { EntityId } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';

import { toasterEmitter } from '@wf/components';

import { uploadService } from '../../services/uploadService';

import * as slicesActions from '../uploads/slices';
import type { IUploadsEntityProps } from './types';
import { uploadsDataSelector } from './selectors';
import * as actions from './actions';

function* getUploadParams(action: ReturnType<typeof actions.getUploadParams>) {
  const {
    payload: { url, fieldName, formData },
  } = action;

  try {
    const uploadsDataState: IUploadsEntityProps = yield select(uploadsDataSelector);
    const { data }: AxiosResponse = yield call(uploadService, {
      url,
      formData,
    });

    const uploadParams = {
      fieldName,
      uploadedFileInfo: data,
      isNotUploadedYet: false,
    };

    if (uploadsDataState.entities[fieldName]) {
      yield put(slicesActions.updateUpload({ id: fieldName as EntityId, changes: uploadParams }));
    } else {
      yield put(slicesActions.addUpload(uploadParams));
    }
  } catch (errors: unknown) {
    toasterEmitter({
      title: 'Error Message',
      status: 'error',
      description: (errors as Array<Record<string, any>>)[0]?.message,
    });
    console.error(errors);
  }
}

export function* watchUploadsSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getUploadParams.type, getUploadParams);
}
