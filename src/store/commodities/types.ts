import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type CommodityState = {
  data: ICommoditiesEntityProps;
};

export interface ICommoditiesEntityProps {
  entities: Dictionary<ICommodityItem>;
  ids: EntityId[];
}

export interface ICommodityItem {
  code: string;
  description: string;
}

export type CommodityType = {
  resultList: ICommodityItem[];
  totalCount: number;
};

export type GetCommoditiesApiPayload = {
  commodityCodeValue?: string;
};
