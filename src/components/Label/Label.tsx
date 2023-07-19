import type { FC } from 'react';

import { Icon } from '@wf/components';

import type { ILabelProps } from './LabelType';

import styles from './Label.module.scss';

const Label: FC<ILabelProps> = ({ children, icon, mandatory = false }) => (
  <div className={styles.content}>
    {children}
    {icon && <Icon name={icon} />}
    {mandatory && <span>*</span>}
  </div>
);

export default Label;
