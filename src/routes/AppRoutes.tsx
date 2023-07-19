import { type FC, lazy, Suspense } from 'react';

const LicensesRoutes = lazy(() => import('../modules/Licenses/routes/LicensesRoutes' as string));

const AppRoutes: FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LicensesRoutes />
  </Suspense>
);

export default AppRoutes;
