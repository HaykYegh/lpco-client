import type { FC } from 'react';

import styles from './TabContent.module.scss';

const TabContent: FC<IWithReactChildren> = ({ children }) => <div className={styles.container}>{children}</div>;

export default TabContent;
