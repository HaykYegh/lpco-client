import type { EntityId } from '@reduxjs/toolkit';

import type { IItemsItem } from '../../store/types';

export interface ILItemsViewProps {
  allItems: Array<IItemsItem>;
  allItemsWithErrors: Array<IItemsItem>;
  handleEditItem: (id: EntityId, method?: string) => void;
  handleDeleteItem: (id: EntityId) => void;
  handleCreateItem: () => void;
  type?: string;
}

export interface ILItemsViewTHeaderItem {
  name: string;
  flex: number;
}
