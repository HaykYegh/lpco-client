import type { FC } from 'react';

import { useKeycloakContext } from '@wf/keycloak-axios-provider';
import { SideBar } from '@wf/components';

import type { IUserInfo } from './SideBarHeaderTypes';

import styles from './SideBarHeader.module.scss';

import LogoSmSrc from '../../../../assets/logos/webbfontaine/logo-sm.svg';
import LogoSrc from '../../../../assets/logos/webbfontaine/logo.svg';

const SideBarHeader: FC = (): JSX.Element => {
  const user: IUserInfo = useKeycloakContext()?.getUserData();

  return (
    <SideBar.Header>
      <SideBar.MenuItem className={styles.header_logo}>
        {({ isCollapsed }: { isCollapsed: boolean }) => (
          <SideBar.MenuLink href="#main" isCollapsed={isCollapsed} title="home" withoutHover>
            <img src={isCollapsed ? LogoSmSrc : LogoSrc} alt="logo" />
          </SideBar.MenuLink>
        )}
      </SideBar.MenuItem>
      <SideBar.UserMenuItem
        title={`${user?.firstName} ${user?.lastName}`}
        firstName={user?.firstName}
        lastName={user?.lastName}
        href="#"
      >
        {`${user?.firstName} ${user?.lastName}`}
      </SideBar.UserMenuItem>
    </SideBar.Header>
  );
};

export default SideBarHeader;
