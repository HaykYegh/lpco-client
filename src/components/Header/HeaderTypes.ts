import type { ReactElement } from 'react';

export interface IHeader {
  title: ReactElement | string;
  link?: string;
  actions?: Array<ActionType> | null;
  groupActions?: Array<ActionType> | null;
  rightContent?: string | ReactElement;
  className?: string;
}

export type ActionType = {
  field: HeaderItems;
  text?: string;
  color?: ColorType;
  ghost?: boolean;
  leftIcon?: string;
  secondary?: boolean;
  outlined?: boolean;
  name: string;
  link?: string;
  handleSubmit?: (name?: string) => void;
};

export enum HeaderItems {
  button = 'Button',
}
