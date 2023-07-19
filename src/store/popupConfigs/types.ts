import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type PopupConfigsState = {
  data: IPopupConfigsEntityProps;
};

export interface IPopupConfigsEntityProps {
  entities: Dictionary<IPopupConfigsItem>;
  ids: EntityId[];
}

export interface IPopupConfigsItem {
  id?: number;
  data: Record<string, any>;
  title: string;
  show: boolean;
  method: string;
  name: string;
}

export enum PopupFormMethods {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  VIEW = 'VIEW',
}

export enum PopupNames {
  ITEMS = 'ITEMS',
  BENEFICIARIES = 'BENEFICIARIES',
  ATT_DOCUMENTS = 'ATT_DOCUMENTS',
}
