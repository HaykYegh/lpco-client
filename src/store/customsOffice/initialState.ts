import { customsOfficeAdapter } from './customsOfficeAdapter';

import type { CustomsOfficeState } from './types';

export const initialState: CustomsOfficeState = {
  data: customsOfficeAdapter.getInitialState(),
};
