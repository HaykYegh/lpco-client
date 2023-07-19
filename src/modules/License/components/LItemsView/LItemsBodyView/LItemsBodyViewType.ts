import type { EntityId } from '@reduxjs/toolkit';

import type { ItemPermissions } from '../../../../../store/licenseType/types';

import type { IItemsItem } from '../../../store/types';

export interface ILItemsBodyViewProps {
  items: Array<IItemsItem>;
  handleEditItem: (id: EntityId, method?: string) => void;
  handleDeleteItem: (id: EntityId) => void;
  subDocsItems: ItemPermissions;
  type?: string;
  currIndex: number;
  hasError?: boolean;
  invoiceValueManagementEnabled: boolean;
}
