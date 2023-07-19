import { commoditiesAdapter } from './commoditiesAdapter';

import type { CommodityState } from './types';

export const initialState: CommodityState = {
  data: commoditiesAdapter.getInitialState(),
};
