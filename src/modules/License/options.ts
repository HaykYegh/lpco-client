import type { SwitcherItemType } from '../../components/Switcher/SwitcherTypes';

import { MULTIPLEOPTION, QuotaType, SINGLEOPTION } from './constants';

export const typeOfUseItems: Array<OptionsItemType> = [
  {
    label: 'Single Use',
    value: SINGLEOPTION,
  },
  {
    label: 'Multiple Use',
    value: MULTIPLEOPTION,
  },
];

export const quotaTypeItems: Array<SwitcherItemType> = [
  {
    id: QuotaType.UOM,
    text: 'UOM',
  },
  {
    id: QuotaType.NET_MASS,
    text: 'Net Mass',
  },
  {
    id: QuotaType.VALUE,
    text: 'Value',
  },
  {
    id: QuotaType.GROSS_MASS,
    text: 'Gross Mass',
  },
  {
    id: QuotaType.TAX,
    text: 'Tax',
  },
  {
    id: QuotaType.UNLIMITED,
    text: 'Unlimited',
  },
];
