import type { FC } from 'react';

import { ToasterManager } from '@wf/components';

import AppLayout from '../../modules/AppLayout';
import AppRoutes from '../../routes/AppRoutes';

const App: FC = () => (
  <AppLayout>
    <AppRoutes />
    <ToasterManager />
  </AppLayout>
);

export default App;
