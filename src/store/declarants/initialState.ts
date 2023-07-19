import { declarantsAdapter } from './entityAdapters';

import type { DeclarantsState } from './types';

export const initialState: DeclarantsState = {
  data: declarantsAdapter.getInitialState(),
};
