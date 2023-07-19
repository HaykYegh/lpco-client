import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type PackageState = {
  data: IPackagesEntityProps;
};

export interface IPackagesEntityProps {
  entities: Dictionary<IPackageItem>;
  ids: EntityId[];
}

export interface IPackageItem {
  code: string;
  description: string;
}

export type PackageType = {
  resultList: IPackageItem[];
  totalCount: number;
};

export type GetPackagesApiPayload = {
  packageCodeValue?: string;
};
