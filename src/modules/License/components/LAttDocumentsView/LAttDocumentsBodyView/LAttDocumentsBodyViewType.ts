import type { EntityId } from '@reduxjs/toolkit';

import type { ItemPermissions } from '../../../../../store/licenseType/types';

import type { IAttDocument } from '../../../store/types';

export interface ILAttDocumentsBodyViewProps {
  attAttDocuments: Array<IAttDocument>;
  handleEditAttDocument: (id: EntityId) => void;
  handleToggleModal: (id?: EntityId) => void;
  subDocsAttDocuments: ItemPermissions;
  type?: string;
  currIndex: number;
  hasError?: boolean;
}
