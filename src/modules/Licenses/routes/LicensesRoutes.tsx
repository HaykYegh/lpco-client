import { Route, Routes } from 'react-router-dom';
import type { FC } from 'react';

import { PrivateRoute } from '@wf/keycloak-axios-provider';

import LDocumentHistoryView from '../../LDocumentHistory/components/LDocumentHistoryView';
import AccessDenied from '../../../components/AccessDenied';
import { appPaths } from '../../../constatnts/appPaths';
import License from '../../License/containers/License';
import LicensesView from '../components/LicensesView';

import { ApplicationRoles } from '../../../constatnts';

const LicensesRoutes: FC = (): JSX.Element => (
  <Routes>
    <Route path={appPaths.indexPath}>
      <Route element={<LicensesView />} index />
      <Route path="view/:id" element={<License />} />
      <Route path="edit/:id" element={<License />} />
      <Route path="documentHistory/:id" element={<LDocumentHistoryView />} />
    </Route>
    <Route
      element={
        <PrivateRoute
          roles={{ lpco2: [ApplicationRoles.ROLE_LPCO2_TRADER, ApplicationRoles.ROLE_LPCO2_DECLARANT] }}
          accessDeniedComponent={<AccessDenied />}
        />
      }
      path={appPaths.indexPath}
    >
      <Route element={<License />} path="create" />
    </Route>
  </Routes>
);

export default LicensesRoutes;
