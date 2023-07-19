import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type CompaniesState = {
  data: ICompaniesEntityProps;
};

export interface ICompaniesEntityProps {
  entities: Dictionary<ICompanyItem>;
  ids: EntityId[];
}

export interface ICompanyItem {
  code: string;
  description: string;
  address1?: string;
  address2?: string;
  phoneNumber?: string;
  email?: string;
}

export type CompanyType = {
  resultList: ICompanyItem[];
  totalCount: number;
};

export type GetCompaniesApiPayload = {
  companyCodeValue?: string;
};
