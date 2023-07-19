import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type CustomsOfficeState = {
  data: ICustomsOfficeEntityProps;
};

export interface ICustomsOfficeEntityProps {
  entities: Dictionary<ICustomsOfficeItem>;
  ids: EntityId[];
}

export interface ICustomsOfficeItem {
  code: string;
  description: string;
}

export type CustomsOfficeType = {
  resultList: ICustomsOfficeItem[];
  totalCount: number;
};

export type GetCustomsOfficeApiPayload = {
  customsOfficeSearchValue?: string;
};
