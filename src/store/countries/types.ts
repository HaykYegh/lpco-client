import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type CountriesState = {
  data: ICountriesEntityProps;
};

export interface ICountriesEntityProps {
  entities: Dictionary<ICountryItem>;
  ids: EntityId[];
}

export interface ICountryItem {
  code: string;
  description: string;
}

export type CountriesType = {
  resultList: ICountryItem[];
  totalCount: number;
};

export type GetCountriesApiPayload = {
  countryCodeValue?: string;
};
