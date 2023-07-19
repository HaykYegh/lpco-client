import type { FC } from 'react';

import type { ITabContentSection } from './TabContentSectionType';

import styles from './TabContentSection.module.scss';

const TabContentSection: FC<ITabContentSection> = ({ children, title }) => (
  <div className={styles.content}>
    {title && <h3>{title}</h3>}
    {children}
  </div>
);

export default TabContentSection;
