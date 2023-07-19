import type { EntityId } from '@reduxjs/toolkit';

export interface IGetLicenseHeaderActionsParams {
  type?: string;
  id?: string;
  handleSubmit: (name: string) => Promise<void>;
  handleCancel?: () => void;
  groupIds?: Array<EntityId>;
}
