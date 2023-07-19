import type { LegacyRef } from 'react';

// eslint-disable-next-line max-len
import type { IAttDocumentFormData } from '../../../containers/LAttDocumentsContainer/LAttDocumentPopupContent/LAttDocumentPopupContentTypes';

import type { IAttachmentItem } from '../../../../../store/attachments/types';
import type { IItemsOperationFields } from '../../../store/types';

export interface ILAttDocumentPopupViewProps {
  type?: string;
  form?: Record<string, any>;
  itemChangeMethod: string;
  showPopup: boolean;
  title: string;
  handleCreateAttDocument: (data: IAttDocumentFormData) => void;
  handleUpdateAttDocument: (data: IAttDocumentFormData) => void;
  handleClosePopup: () => void;
  attachmentsState: IAttachmentItem[];
  handleAttachmentChange: (attachmentValue: string) => void;
  singleInputRef: LegacyRef<HTMLInputElement> | undefined;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileDrop: (e: React.DragEvent<HTMLInputElement>) => void;
  handleChooseFile: () => void;
  handleDeleteFile: () => void;
  fileUploadError: (errorsData: Record<string, any>) => void;
  mandatoryFields?: IItemsOperationFields;
  editableFields?: IItemsOperationFields;
}
