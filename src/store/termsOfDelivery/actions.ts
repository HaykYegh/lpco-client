import { createAction } from '@reduxjs/toolkit';

import type { GetTermsOfDeliveryApiPayload } from './types';

export const getTermsOfDeliveryApi = createAction<GetTermsOfDeliveryApiPayload>('getTermsOfDeliveryApi');
