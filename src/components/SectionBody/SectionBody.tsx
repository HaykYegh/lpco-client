import type { FC } from 'react';

import styles from './SectionBody.module.scss';

const SectionBody: FC<IWithReactChildren> = ({ children }) => <div className={styles.section_body}>{children}</div>;

export default SectionBody;
