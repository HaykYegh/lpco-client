import { packagesAdapter } from './packagesAdapter';

import type { PackageState } from './types';

export const initialState: PackageState = {
  data: packagesAdapter.getInitialState(),
};
