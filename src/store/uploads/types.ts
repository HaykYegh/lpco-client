import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type UploadsState = {
  data: IUploadsEntityProps;
};

export interface IUploadsEntityProps {
  entities: Dictionary<IUploadItem>;
  ids: EntityId[];
}

export type UploadedFile = {
  fileName: string;
  fileUrl: string;
};

export interface IUploadItem {
  fieldName: string;
  uploadedFileInfo: UploadedFile;
  isNotUploadedYet?: boolean;
}

export type GetUploadParamsPayload = {
  url: string;
  fieldName: string;
  formData: FormData;
};
