import { all, fork } from 'redux-saga/effects';

import { watchDocumentHistorySaga } from '../modules/LDocumentHistory/store/sagas';
import { watchLicensesSaga } from '../modules/Licenses/store/sagas';
import { watchTermsOfDeliverySaga } from './termsOfDelivery/sagas';
import { watchLicenseSaga } from '../modules/License/store/sagas';
import { watchCustomsOfficeSaga } from './customsOffice/sagas';
import { watchExchangeRateSaga } from './exchangeRate/sagas';
import { watchLicenseTypeSaga } from './licenseType/sagas';

import { watchCommoditiesSaga } from './commodities/sagas';
import { watchAttachmentsSaga } from './attachments/sagas';
import { watchDeclarantsSaga } from './declarants/sagas';
import { watchCountriesSaga } from './countries/sagas';
import { watchCompaniesSaga } from './companies/sagas';
import { watchPackagesSaga } from './packages/sagas';
import { watchUploadsSaga } from './uploads/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchLicensesSaga),
    fork(watchLicenseSaga),
    fork(watchLicenseTypeSaga),
    fork(watchCountriesSaga),
    fork(watchCompaniesSaga),
    fork(watchCommoditiesSaga),
    fork(watchAttachmentsSaga),
    fork(watchUploadsSaga),
    fork(watchDocumentHistorySaga),
    fork(watchPackagesSaga),
    fork(watchCustomsOfficeSaga),
    fork(watchTermsOfDeliverySaga),
    fork(watchExchangeRateSaga),
    fork(watchDeclarantsSaga),
  ]);
}
