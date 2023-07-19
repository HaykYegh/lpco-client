import type { RootState } from '../../../store';

export const documentHistorySelector = (state: RootState) => state.documentHistory.documentHistoryData;
