import classNames from 'classnames';
import type { FC } from 'react';

import { color, Icon, Portal } from '@wf/components';

import type { IPopupProps } from './PopupTypes';

import styles from './Popup.module.scss';

const Popup: FC<IPopupProps> = ({ children, title, showPopup, handleClosePopup, hasCloseIcon = true }) => (
  <Portal>
    <div className={classNames(styles.container, { [styles.container_show as string]: showPopup })}>
      <div className={classNames(styles.content, { [styles.content_show as string]: showPopup })}>
        <div className={styles.content_header}>
          {hasCloseIcon && (
            <Icon name="ic_close" onClick={handleClosePopup} color={color('typography', 'light')} size={25} />
          )}
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  </Portal>
);

export default Popup;
