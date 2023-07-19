import type { EntityId } from '@reduxjs/toolkit';

export type ModalOptionsState = {
  isOpen: boolean;
  id: EntityId | null;
};
