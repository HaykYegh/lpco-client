import type { FC } from 'react';

import { Layout, SideBar } from '@wf/components';

import SideBarFooter from './components/SideBarFooter';
import SideBarHeader from './components/SideBarHeader';
import AppMenu from './components/AppMenu';

import styles from './AppLayout.module.scss';

const AppLayout: FC<IWithReactChildren> = ({ children }): JSX.Element => (
  <Layout>
    <SideBar className={styles.layout_sidebar} isDefaultCollapsed={false}>
      <SideBarHeader />
      <AppMenu />
      <SideBarFooter />
    </SideBar>
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

export default AppLayout;
