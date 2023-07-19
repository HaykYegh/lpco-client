import type { FC, ReactElement } from 'react';

import type { IFieldContentProps } from './FieldContentTypes';
import TextField from '../TextField';

const FieldContent: FC<IFieldContentProps> = ({ label, textContent, enabled = true, viewMode, children }) => {
  if (viewMode) {
    return enabled ? <TextField label={label}>{textContent}</TextField> : null;
  }

  return enabled ? (children as ReactElement) : null;
};

export default FieldContent;
