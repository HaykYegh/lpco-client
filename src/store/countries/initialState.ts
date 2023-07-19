import { countriesAdapter } from './entityAdapters';

import type { CountriesState } from './types';

export const initialState: CountriesState = {
  data: countriesAdapter.getInitialState(),
};
