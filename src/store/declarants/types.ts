import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type DeclarantsState = {
  data: IDeclarantsEntityProps;
};

export interface IDeclarantsEntityProps {
  entities: Dictionary<IDeclarantItem>;
  ids: EntityId[];
}

export interface IDeclarantItem {
  code: string;
  description: string;
}

export type DeclarantType = {
  resultList: IDeclarantItem[];
  totalCount: number;
};

export type GetDeclarantsApiPayload = {
  declarantCodeValue?: string;
};
