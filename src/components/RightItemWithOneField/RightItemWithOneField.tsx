import classNames from 'classnames';
import type { FC } from 'react';

import type { IRightItemWithOneField } from './RightItemWithOneFieldTypes';

import styles from './RightItemWithOneField.module.scss';

const RightItemWithOneField: FC<IRightItemWithOneField> = ({ children, className }) => (
  <div className={classNames(styles.section_row_iwof, styles[className as string])}>{children}</div>
);

export default RightItemWithOneField;
