import { createSlice, type EntityId, type PayloadAction, type Update } from '@reduxjs/toolkit';

import { popupConfigsAdapter } from './popupConfigsAdapter';

import type { IPopupConfigsItem, PopupConfigsState } from './types';

const initialState = {
  data: popupConfigsAdapter.getInitialState(),
};

export const popupConfigs = createSlice({
  name: 'popupConfigs',
  initialState,
  reducers: {
    addPopupConfig: (state: PopupConfigsState, { payload }: PayloadAction<IPopupConfigsItem>) => {
      popupConfigsAdapter.addOne(state.data, payload);
    },

    removePopupConfig: (state: PopupConfigsState, { payload }: PayloadAction<EntityId>) => {
      popupConfigsAdapter.removeOne(state.data, payload);
    },

    updatePopupConfig: (state: PopupConfigsState, { payload }: PayloadAction<Update<IPopupConfigsItem>>) => {
      popupConfigsAdapter.updateOne(state.data, payload);
    },
  },
});

export const { addPopupConfig, removePopupConfig, updatePopupConfig } = popupConfigs.actions;
