import type { ReactElement } from 'react';

export interface ITextFieldProps extends IWithReactChildren {
  label: string | ReactElement;
}
