import {
  attDocumentsAdapter,
  attDocumentsWithErrorsAdapter,
  beneficiariesAdapter,
  beneficiariesWithErrorsAdapter,
  itemsAdapter,
  itemsWithErrorsAdapter,
  lFeesAdapter,
} from '../store/entityAdapters';
import { defaultLicense } from '../store/initialState';

import type { LicenseState } from '../store/types';

export const pushDefaultLpcoData = (state: LicenseState) => {
  state.licenseProps = defaultLicense;
  beneficiariesWithErrorsAdapter.setAll(state.beneficiariesWithErrors, []);
  attDocumentsWithErrorsAdapter.setAll(state.attachedDocumentsWithErrors, []);
  itemsWithErrorsAdapter.setAll(state.itemsWithErrors, []);
  lFeesAdapter.setAll(state.fees, []);
  beneficiariesAdapter.setAll(state.beneficiaries, []);
  attDocumentsAdapter.setAll(state.attachedDocuments, []);
  itemsAdapter.setAll(state.items, []);
};
