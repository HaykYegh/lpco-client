import type { FC } from 'react';

import { useKeycloakContext } from '@wf/keycloak-axios-provider';

import { type IUserInfo } from '../../../AppLayout/components/SideBarHeader/SideBarHeaderTypes';
import { HeaderItems } from '../../../../components/Header/HeaderTypes';
import ContentContainer from '../../../../components/ContentContainer';
import { appPaths } from '../../../../constatnts/appPaths';
import LicensesViewTexts from './LicensesViewTexts';
import Header from '../../../../components/Header';
import Licenses from '../../containers/Licenses';

import { ApplicationRoles } from '../../../../constatnts';

import styles from './LicensesView.module.scss';

const LicensesView: FC = () => {
  const user: IUserInfo = useKeycloakContext()?.getUserData();
  const userRoles = user?.roles?.lpco2 ?? [];
  const hasAccess =
    userRoles.includes(ApplicationRoles.ROLE_LPCO2_TRADER) || userRoles.includes(ApplicationRoles.ROLE_LPCO2_DECLARANT);

  const headerActions = hasAccess
    ? [
        {
          field: HeaderItems.button,
          text: 'Fill New Application',
          color: 'success' as ColorType,
          leftIcon: 'ic_add',
          name: 'create',
          link: `${appPaths.indexPath}create`,
        },
      ]
    : [];

  return (
    <div className={styles.container}>
      <Header actions={headerActions} title={<h2>{LicensesViewTexts.TITTLE}</h2>} />
      <ContentContainer>
        <Licenses
          emptyDataTitle={LicensesViewTexts.NEW_REQ_EMPTY_DATA_TITTLE}
          emptyDataText={LicensesViewTexts.NEW_REQ_EMPTY_DATA_DESC}
          title={LicensesViewTexts.NEW_REQUESTS}
          lpcoBool={false}
        />
        <Licenses
          emptyDataTitle={LicensesViewTexts.LPCO_LIST_EMPTY_DATA_TITTLE}
          emptyDataText={LicensesViewTexts.LPCO_LIST_EMPTY_DATA_DESC}
          title={LicensesViewTexts.LPCO_LIST}
          lpcoBool={true}
        />
      </ContentContainer>
    </div>
  );
};

export default LicensesView;
