import { combineReducers } from '@reduxjs/toolkit';

import { documentHistory } from '../modules/LDocumentHistory/store/slices';
import { licenses } from '../modules/Licenses/store/slices';
import { termsOfDelivery } from './termsOfDelivery/slices';
import { license } from '../modules/License/store/slices';
import { customsOffice } from './customsOffice/slices';
import { popupConfigs } from './popupConfigs/slices';
import { exchangeRate } from './exchangeRate/slices';
import { licenseType } from './licenseType/slices';

import { commodities } from './commodities/slices';
import { attachments } from './attachments/slices';
import { declarants } from './declarants/slices';
import { countries } from './countries/slices';
import { companies } from './companies/slices';
import { packages } from './packages/slices';
import { uploads } from './uploads/slices';

export default combineReducers({
  [licenses.name]: licenses.reducer,
  [license.name]: license.reducer,
  [licenseType.name]: licenseType.reducer,
  [countries.name]: countries.reducer,
  [companies.name]: companies.reducer,
  [popupConfigs.name]: popupConfigs.reducer,
  [commodities.name]: commodities.reducer,
  [attachments.name]: attachments.reducer,
  [uploads.name]: uploads.reducer,
  [documentHistory.name]: documentHistory.reducer,
  [packages.name]: packages.reducer,
  [customsOffice.name]: customsOffice.reducer,
  [termsOfDelivery.name]: termsOfDelivery.reducer,
  [exchangeRate.name]: exchangeRate.reducer,
  [declarants.name]: declarants.reducer,
});
