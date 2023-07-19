import type { FC } from 'react';

import styles from './RowWithTwoField.module.scss';

const RowWithTwoField: FC<IWithReactChildren> = ({ children }) => (
  <div className={styles.section_row_wtf}>{children}</div>
);

export default RowWithTwoField;
