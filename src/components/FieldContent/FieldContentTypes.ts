import type { ReactElement } from 'react';

export interface IFieldContentProps extends IWithReactChildren {
  label: string | ReactElement;
  textContent: string | ReactElement;
  enabled?: boolean;
  viewMode: boolean;
}
