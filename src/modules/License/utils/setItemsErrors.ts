import {
  attDocumentsAdapter,
  attDocumentsWithErrorsAdapter,
  beneficiariesAdapter,
  beneficiariesWithErrorsAdapter,
  itemsAdapter,
  itemsWithErrorsAdapter,
} from '../store/entityAdapters';

import type { IItemsErrors, LicenseState } from '../store/types';

export function setItemsErrors(
  state: LicenseState,
  {
    beneficiariesWithErrors,
    beneficiariesIds,
    attachedDocumentsWithErrors,
    attachedDocumentsIds,
    itemsWithErrors,
    itemsIds,
  }: IItemsErrors
) {
  beneficiariesWithErrorsAdapter.setAll(state.beneficiariesWithErrors, beneficiariesWithErrors);
  beneficiariesAdapter.removeMany(state.beneficiaries, beneficiariesIds);
  attDocumentsWithErrorsAdapter.setAll(state.attachedDocumentsWithErrors, attachedDocumentsWithErrors);
  attDocumentsAdapter.removeMany(state.attachedDocuments, attachedDocumentsIds);
  itemsWithErrorsAdapter.setAll(state.itemsWithErrors, itemsWithErrors);
  itemsAdapter.removeMany(state.items, itemsIds);
}
