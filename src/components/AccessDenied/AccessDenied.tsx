import type { FC } from 'react';

import styles from './AccessDenied.module.css';

const AccessDenied: FC = (): JSX.Element => (
  <div className={styles.accessDenied}>
    <h2>Access denied</h2>
    <h5>Forbidden: You do not have permission to access requested page</h5>
  </div>
);

export default AccessDenied;
