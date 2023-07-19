import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { GetLicensesApiPayload } from '../../store/types';

export interface ILicensesProps {
  title: string;
  emptyDataTitle: string;
  emptyDataText: string;
  lpcoBool: boolean;
}

export interface IGetLpcoParams {
  limit?: number;
  offset?: number;
  selectFields: string[];
  statusesConfigs: Record<string, boolean>;
  statusesConfigsBool: boolean;
  statusOption?: SelectBaseOption;
  lpcoTypeOption?: SelectBaseOption;
  func: ActionCreatorWithPayload<GetLicensesApiPayload>;
}
