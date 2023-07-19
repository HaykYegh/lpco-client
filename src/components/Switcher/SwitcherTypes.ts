import type { ReactElement } from 'react';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

export type Size = 'sm' | 'md' | 'lg' | 'auto';

export interface ISwitcherProps {
  className?: string;
  size?: Size;
  color?: ColorType;
  label?: ReactElement | string;
  onChange?: (option: IdType) => void;
  value?: IdType;
  viewModeValue?: string;
  items: Array<SwitcherItemType>;
  disabled?: boolean;
}

export type SwitcherLabelType = {
  text?: string;
  icon?: string;
};

export type SwitcherItemType = {
  id: IdType;
  text: string;
  rIcon?: string;
};
