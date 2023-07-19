import type { EntityId } from '@reduxjs/toolkit';

export interface IFlexableButton {
  type: string;
  handleClick?: (id?: EntityId) => void;
  id?: EntityId;
}

export enum ButtonTypes {
  edit = 'edit',
  delete = 'delete',
  update = 'update',
  cancel = 'cancel',
}
