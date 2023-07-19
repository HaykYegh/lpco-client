import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type AttachmentsState = {
  data: IAttachmentsEntityProps;
};

export interface IAttachmentsEntityProps {
  entities: Dictionary<IAttachmentItem>;
  ids: EntityId[];
}

export interface IAttachmentItem {
  code: string;
  description: string;
}

export type AttachmentType = {
  resultList: IAttachmentItem[];
  totalCount: number;
};

export type GetAttachmentsApiPayload = {
  attDocumentCodeValue?: string;
};
