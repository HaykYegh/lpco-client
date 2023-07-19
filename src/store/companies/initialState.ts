import { companiesAdapter } from './entityAdapters';

import type { CompaniesState } from './types';

export const initialState: CompaniesState = {
  data: companiesAdapter.getInitialState(),
};
