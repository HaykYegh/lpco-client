import type { IDocumentHistoryItem } from '../../store/types';

export interface ILDocumentHistoryTHeaderItem {
  name: string;
  flex: number;
}

export interface ILDocumentHistoryTBodyProps {
  data: Array<IDocumentHistoryItem>;
  dataCount: number;
  emptyDataTitle?: string;
  emptyDataText?: string;
}
