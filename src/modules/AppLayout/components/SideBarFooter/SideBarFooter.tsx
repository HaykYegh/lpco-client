import type { FC } from 'react';

import { SideBar } from '@wf/components';

import SideBarFooterTexts from './SideBarFooterTexts';

const SideBarFooter: FC = (): JSX.Element => (
  <SideBar.Footer>
    <SideBar.MenuItem title="Log Out" icon="log-out">
      {SideBarFooterTexts.LOG_OUT}
    </SideBar.MenuItem>
    <SideBar.MenuItem title="All apps" icon="apps">
      {SideBarFooterTexts.ALL_APPS}
    </SideBar.MenuItem>
  </SideBar.Footer>
);

export default SideBarFooter;
