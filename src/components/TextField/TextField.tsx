import type { FC } from 'react';

import type { ITextFieldProps } from './TextFieldTypes';

import styles from './TextField.module.scss';

const TextField: FC<ITextFieldProps> = ({ label, children }) => (
  <div className={styles.empty_field}>
    <label>{label}</label>
    <div className={styles.field_text}>{children ?? ' _'}</div>
  </div>
);

export default TextField;
