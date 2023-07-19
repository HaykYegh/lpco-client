import classNames from 'classnames';
import type { FC } from 'react';

import type { ISectionRowProps } from './SectionRowTypes';

import styles from './SectionRow.module.scss';

const SectionRow: FC<ISectionRowProps> = ({ children, className }) => (
  <div className={classNames(styles.section_row_item, className)}>{children}</div>
);

export default SectionRow;
