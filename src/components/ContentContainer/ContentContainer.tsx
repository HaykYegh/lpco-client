import type { FC } from 'react';

import styles from './ContentContainer.module.scss';

const ContentContainer: FC<IWithReactChildren> = ({ children }) => (
  <div className={styles.content_container}>{children}</div>
);

export default ContentContainer;
