import classNames from 'classnames';
import type { FC } from 'react';

import type { IRightItemWithTwoField } from './RightItemWithTwoFieldTypes';

import styles from './RightItemWithTwoField.module.scss';

const RightItemWithTwoField: FC<IRightItemWithTwoField> = ({ children, className }) => (
  <div className={classNames(styles.section_row_iwtf, styles[className as string])}>{children}</div>
);

export default RightItemWithTwoField;
