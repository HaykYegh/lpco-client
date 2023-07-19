import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type ExchangeRateState = {
  data: IExchangeRateEntityProps;
};

export interface IExchangeRateEntityProps {
  entities: Dictionary<IExchangeRateItem>;
  ids: EntityId[];
}

export interface IExchangeRateItem {
  code: string;
  description: string;
}

export type ExchangeRateType = {
  resultList: IExchangeRateItem[];
  totalCount: number;
};

export type GetExchangeRateApiPayload = {
  exchangeRateSearchValue?: string;
};
