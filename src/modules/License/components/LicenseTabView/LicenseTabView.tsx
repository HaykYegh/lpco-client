import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { Tabs } from '@wf/components';

import LicenseNamesAndPartiesContainer from '../../containers/LicenseNamesAndPartiesContainer';
import LBeneficiariesContainer from '../../containers/LBeneficiariesContainer';
import LicenseHeaderContainer from '../../containers/LicenseHeaderContainer';
import LAttDocumentsContainer from '../../containers/LAttDocumentsContainer';
import type { ILicenseTabViewProps } from './LicenseTabViewTypes';
import LItemsContainer from '../../containers/LItemsContainer';
import LicenseTabViewTexts from './LicenseTabViewTexts';
import LFeesView from '../LFeesView';

import {
  licenseAttDocumentsWithErrorsSelector,
  licenseBeneficiariesWithErrorsSelector,
  licenseItemsWithErrorsSelector,
} from '../../store/selectors';

import styles from './LicenseTabView.module.scss';

const LicenseTabView: FC<ILicenseTabViewProps> = ({
  form,
  licenseTypeByCodeState,
  licenseTypeFeatureFlagsByCodeState,
  isLicenseFees,
  licenseCodeSearchValue,
  handleLicenseCodeChange,
  handleLicenseChange,
  validationOptions,
}) => {
  const beneficiariesWithErrorsData = useSelector(licenseBeneficiariesWithErrorsSelector);
  const licenseItemsWithErrorsData = useSelector(licenseItemsWithErrorsSelector);
  const licenseAttDocumentsWithErrorsData = useSelector(licenseAttDocumentsWithErrorsSelector);

  return (
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab hasError={validationOptions.isHeaderWithError}>{LicenseTabViewTexts.HEADER}</Tabs.Tab>
        <Tabs.Tab hasError={validationOptions.isNamesAndPartiesWithError || !!beneficiariesWithErrorsData.ids.length}>
          {LicenseTabViewTexts.NAMES_AND_PARTIES}
        </Tabs.Tab>
        <Tabs.Tab hasError={!!licenseItemsWithErrorsData.ids.length}>{LicenseTabViewTexts.ITEMS}</Tabs.Tab>
        <Tabs.Tab hasError={!!licenseAttDocumentsWithErrorsData.ids.length}>
          {LicenseTabViewTexts.ATTACHED_DOCUMENTS}
        </Tabs.Tab>
        {isLicenseFees && <Tabs.Tab>{LicenseTabViewTexts.FEES}</Tabs.Tab>}
      </Tabs.TabList>
      <Tabs.TabPanel>
        <LicenseHeaderContainer
          countryOfExportOrImportEnabled={licenseTypeFeatureFlagsByCodeState?.countryOfExportOrImportEnabled}
          invoiceValueManagementEnabled={licenseTypeFeatureFlagsByCodeState?.invoiceValueManagementEnabled}
          placeOfUnloadingEnabled={licenseTypeFeatureFlagsByCodeState?.placeOfUnloadingEnabled}
          relatedProductsEnabled={licenseTypeFeatureFlagsByCodeState?.relatedProductsEnabled}
          placeOfLoadingEnabled={licenseTypeFeatureFlagsByCodeState?.placeOfLoadingEnabled}
          termOfDeliveryEnabled={licenseTypeFeatureFlagsByCodeState?.termOfDeliveryEnabled}
          typeOfUseEnabled={licenseTypeFeatureFlagsByCodeState?.typeOfUseEnabled}
          flowEnabled={licenseTypeFeatureFlagsByCodeState?.flowEnabled}
          relatedProducts={licenseTypeByCodeState.relatedProducts}
          handleLicenseCodeChange={handleLicenseCodeChange}
          licenseCodeSearchValue={licenseCodeSearchValue}
          handleLicenseChange={handleLicenseChange}
          flow={licenseTypeByCodeState.flow}
          form={form}
        />
      </Tabs.TabPanel>
      <Tabs.TabPanel className={styles.multi_sections}>
        <LicenseNamesAndPartiesContainer form={form} />
        {licenseTypeFeatureFlagsByCodeState?.listOfBeneficiariesEnabled && <LBeneficiariesContainer />}
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <FormProvider {...form}>
          <LItemsContainer />
        </FormProvider>
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <LAttDocumentsContainer />
      </Tabs.TabPanel>
      {isLicenseFees && (
        <Tabs.TabPanel>
          <LFeesView />
        </Tabs.TabPanel>
      )}
    </Tabs>
  );
};

export default LicenseTabView;
