import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type TermsOfDeliveryState = {
  data: ITermsOfDeliveryEntityProps;
};

export interface ITermsOfDeliveryEntityProps {
  entities: Dictionary<ITermsOfDeliveryItem>;
  ids: EntityId[];
}

export interface ITermsOfDeliveryItem {
  code: string;
  description: string;
}

export type TermsOfDeliveryType = {
  resultList: ITermsOfDeliveryItem[];
  totalCount: number;
};

export type GetTermsOfDeliveryApiPayload = {
  termsOfDeliverySearchValue?: string;
};
