import { termsOfDeliveryAdapter } from './termsOfDeliveryAdapter';

import type { TermsOfDeliveryState } from './types';

export const initialState: TermsOfDeliveryState = {
  data: termsOfDeliveryAdapter.getInitialState(),
};
