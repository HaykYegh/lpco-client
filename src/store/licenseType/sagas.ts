import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { defaultLicenseTypeByCode, defaultLicenseTypeFeatureFlagsByCode } from './initialState';
import { createArrayWithEntityIds } from '../../helpers/createArrayWithEntityIds';
import { createArrayFromItemsArr } from '../../helpers/createArrayFromItemsArr';
import { filterDataByPropName } from '../../helpers/filterDataByPropName';
import { defaultSubDocs } from '../../modules/License/store/initialState';
import * as lpcoSliceActions from '../../modules/License/store/slices';
import * as lpcoActions from '../../modules/License/store/actions';

import { getLicenseTypeByCode } from '../../services/licenseTypeApiService';

import { feeMode, licenseFeeTypes } from './types';

import type {
  IApprovalItem,
  IApprovalProps,
  IAprovalsPayload,
  IAttachedDocumentItem,
  IFeatureFlagsProps,
  IFeeItem,
  ILType,
  ITransitionItem,
} from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* setLicenseType(action: ReturnType<typeof actions.setLicenseType>) {
  const {
    payload: {
      licenseTypeByCodeParams,
      featureFlags,
      transitions,
      approvalsData,
      attachedDocuments,
      feesData,
      feesForExtendData,
    },
  } = action;

  try {
    yield put(slicesActions.setLicenseTypeByCode(licenseTypeByCodeParams));
    yield put(slicesActions.setLicenseTypeFeatureFlags(featureFlags));
    yield put(
      slicesActions.setAllAprovals({
        transitions,
        approvalsData,
      } as IAprovalsPayload)
    );
    yield put(slicesActions.setAllAttachedDocuments(attachedDocuments));
    yield put(slicesActions.setAllLicenseFees(feesData));
    yield put(slicesActions.setAllLicenseFeesForExtend(feesForExtendData));
  } catch (err) {
    console.error(err);
  }
}

function* getLicenseTypeByCodeApi(action: ReturnType<typeof actions.getLicenseTypeByCodeApi>) {
  const {
    payload: { licenseTypeCode, withOperations, withId },
  } = action;

  try {
    if (licenseTypeCode) {
      const {
        data: {
          licenseTypeResponse: {
            featureFlags,
            approvals,
            fees,
            attachedDocuments,
            additionalFields,
            ...licenseTypeProps
          },
          configs: { operations, subDocs },
        },
      }: AxiosResponse<ILType> = yield call(getLicenseTypeByCode, {
        withId,
        licenseTypeCode,
      });

      const licenseTypeByCodeParams = {
        ...licenseTypeProps,
        applicationFeeMode: licenseTypeProps.applicationFeeMode ?? feeMode.NONE,
        extensionFeeMode: licenseTypeProps.extensionFeeMode ?? feeMode.NONE,
      };

      const transitions: Array<IApprovalItem> = createArrayFromItemsArr('transitions', approvals);
      const transitionsItem = 'transitions';
      const approvalsData: Array<IApprovalProps> = createArrayWithEntityIds(
        [transitionsItem],
        approvals as Array<Record<string, any>>
      );
      const feesData: Array<IFeeItem> = filterDataByPropName(
        'feeType',
        licenseFeeTypes.APPLICATION_FEE,
        fees as IFeeItem[]
      );
      const feesForExtendData: Array<IFeeItem> = filterDataByPropName(
        'feeType',
        licenseFeeTypes.EXTENSION_FEE,
        fees as never
      );

      if (withOperations) {
        yield put(lpcoActions.changeOperations({ configs: operations }));
        yield put(lpcoSliceActions.setOperationsSubDocs(subDocs));
      }

      yield put(
        actions.setLicenseType({
          licenseTypeByCodeParams,
          featureFlags: featureFlags as IFeatureFlagsProps,
          transitions: transitions as unknown as ITransitionItem[],
          approvalsData,
          attachedDocuments: attachedDocuments as IAttachedDocumentItem[],
          feesData,
          feesForExtendData,
        })
      );
    } else {
      if (withOperations) {
        yield put(lpcoActions.changeOperations({ configs: [] as Record<string, any> }));
        yield put(lpcoSliceActions.setOperationsSubDocs(defaultSubDocs));
      }

      yield put(
        actions.setLicenseType({
          licenseTypeByCodeParams: defaultLicenseTypeByCode,
          featureFlags: defaultLicenseTypeFeatureFlagsByCode,
          transitions: [],
          approvalsData: [],
          attachedDocuments: [],
          feesData: [],
          feesForExtendData: [],
        })
      );
    }
  } catch (err) {
    console.error(err);
  }
}

export function* watchLicenseTypeSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getLicenseTypeByCodeApi.type, getLicenseTypeByCodeApi);
  yield takeLatest(actions.setLicenseType.type, setLicenseType);
}
