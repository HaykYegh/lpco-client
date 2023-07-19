import type { EntityId } from '@reduxjs/toolkit';
import type { ReactElement } from 'react';

import type { ColorType } from '@wf/components';

export interface IModalComponentProps extends IWithReactChildren {
  title: ReactElement | string;
  id?: number;
  isOpen: boolean;
  leftButtonColor: ColorType;
  leftButtonText: string;
  handleLeftButtonClick?: (modalId?: EntityId) => void;
  modalId?: EntityId;
  rightButtonColor: ColorType;
  rightButtonText: string;
  handleClosePopup?: () => void;
}
