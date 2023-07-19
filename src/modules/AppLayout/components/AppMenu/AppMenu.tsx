import { NavLink } from 'react-router-dom';
import type { FC } from 'react';

import { SideBar } from '@wf/components';

import { appPaths } from '../../../../constatnts/appPaths';
import AppMenuTexts from './AppMenuTexts';

const AppMenu: FC = () => (
  <SideBar.Content>
    <SideBar.MenuItem title="Ministries" linkComponent={NavLink} linkTo={appPaths.indexPath}>
      {AppMenuTexts.LPCO}
    </SideBar.MenuItem>
  </SideBar.Content>
);

export default AppMenu;
