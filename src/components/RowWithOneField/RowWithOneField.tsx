import type { FC } from 'react';

import styles from './RowWithOneField.module.scss';

const RowWithOneField: FC<IWithReactChildren> = ({ children }) => (
  <div className={styles.section_row_wof}>{children}</div>
);

export default RowWithOneField;
