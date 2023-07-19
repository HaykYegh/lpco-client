import type { RootState } from '../index';

export const attachmentsSelector = (state: RootState) => state.attachments.data;
