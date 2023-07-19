import type { EntityId } from '@reduxjs/toolkit';

import type { ModalOptionsState } from '../../containers/LAttDocumentsContainer/LAttDocumentsContainerTypes';

import type { IAttDocument } from '../../store/types';

export interface ILAttDocumentsViewProps {
  allAttDocuments: Array<IAttDocument>;
  allAttDocumentsWithErrors: Array<IAttDocument>;
  handleEditAttDocument: (id: EntityId) => void;
  handleDeleteAttDocument: (id: EntityId) => void;
  handleToggleModal: (id?: EntityId) => void;
  modalOptions: ModalOptionsState;
  handleCreateAttDocument: () => void;
  type?: string;
}

export interface ILAttDocumentsViewTHeaderItem {
  name: string;
  flex: number;
}
