import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { IFilterItem } from '../../../../components/Table/TableTypes';

import type { ILpcoSearchItem } from '../../store/types';

export interface ILicensesTHeaderItem {
  name: string;
  flex: number;
}

export interface ILicensesTBodyProps {
  data: Array<ILpcoSearchItem>;
  tableFilterItems: Array<IFilterItem<SelectBaseOption>>;
  dataCount: number;
  handlePageChange: (page: number) => void;
  emptyDataTitle?: string;
  emptyDataText?: string;
}
