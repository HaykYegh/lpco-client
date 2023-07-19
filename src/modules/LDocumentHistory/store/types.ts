export type DocumentHistoryState = {
  documentHistoryData: IDocumentHistoryItem[];
};

export interface IDocumentHistoryItem {
  modifiedOn: string;
  ipAddress: string;
  modifiedBy: string;
  eventType: string;
  operation: string;
  version: number;
  status: string;
  supportInfoMessage: string;
}

export type DocumentHistoryResponse = {
  versionListResponse: IDocumentHistoryItem[];
};

export type GetDocumentHistoryApiPayload = {
  documentId: string;
};
