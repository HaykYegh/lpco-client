import { type FC, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import { Alert } from '@wf/components';

import LBeneficiaryPopupContent from '../../containers/LBeneficiariesContainer/LBeneficiaryPopupContent';
import type { ILBeneficiariesViewProps, ILBeneficiariesViewTHeaderItem } from './LBeneficiariesViewType';
import TabContentSection from '../../../../components/TabContentSection';
import { HeaderItems } from '../../../../components/Header/HeaderTypes';
import LBeneficiariesBodyView from './LBeneficiariesBodyView';
import Header from '../../../../components/Header';
import Table from '../../../../components/Table';

import { LicenseModeItems } from '../../store/types';

import { licenseSubDocsBeneficiariesSelector } from '../../store/selectors';

import styles from './LBeneficiariesView.module.scss';

const tableHeaders: Array<ILBeneficiariesViewTHeaderItem> = [
  { name: '#', flex: 1 },
  { name: 'Beneficiary Code', flex: 3 },
  { name: 'Beneficiary Name & Address', flex: 3 },
  { name: 'Beneficiary Phone', flex: 3 },
  { name: 'Beneficiary Email', flex: 3 },
  { name: '', flex: 1 },
];

const LBeneficiariesView: FC<ILBeneficiariesViewProps> = ({
  allBeneficiaries,
  allBeneficiariesWithErrors,
  handleEditBeneficiary,
  handleDeleteBeneficiary,
  type,
  handleCreateBeneficiary,
}) => {
  const [close, setClose] = useState(true);
  const viewMode = type === LicenseModeItems.view;
  const subDocsBeneficiaries = useSelector(licenseSubDocsBeneficiariesSelector);

  const headerOptions = useMemo(
    () => [
      {
        field: HeaderItems.button,
        text: 'Add New Beneficiary',
        color: 'success' as ColorType,
        name: 'add',
        leftIcon: 'ic_add',
        handleSubmit: handleCreateBeneficiary,
      },
    ],
    [handleCreateBeneficiary]
  );

  const beneficiariesWithErrorsLength = allBeneficiariesWithErrors.length;
  const beneficiariesLength = allBeneficiaries.length;
  const allBeneficiariesLength = beneficiariesWithErrorsLength + beneficiariesLength;

  const handleClose = () => {
    setClose(!close);
  };

  return (
    <TabContentSection>
      <Header
        actions={!viewMode && subDocsBeneficiaries.add ? headerOptions : null}
        title={<h2>List of Beneficiaries</h2>}
        className={styles.header_content}
      />
      {!!beneficiariesWithErrorsLength && close && (
        <Alert type="error" onClose={handleClose}>
          {`We have errors in ${beneficiariesWithErrorsLength} items`}
        </Alert>
      )}
      <Table
        emptyDataText="This is place holder text. The basic dialog for tables"
        emptyDataTitle="There is no beneficiary added"
        dataCount={allBeneficiariesLength}
        tableHeaders={tableHeaders}
      >
        <LBeneficiariesBodyView
          handleDeleteBeneficiary={handleDeleteBeneficiary}
          handleEditBeneficiary={handleEditBeneficiary}
          subDocsBeneficiaries={subDocsBeneficiaries}
          beneficiaries={allBeneficiariesWithErrors}
          currentIndex={0}
          hasError={true}
          type={type}
        />
        <LBeneficiariesBodyView
          handleDeleteBeneficiary={handleDeleteBeneficiary}
          handleEditBeneficiary={handleEditBeneficiary}
          currentIndex={beneficiariesWithErrorsLength}
          subDocsBeneficiaries={subDocsBeneficiaries}
          beneficiaries={allBeneficiaries}
          type={type}
        />
      </Table>
      <LBeneficiaryPopupContent />
    </TabContentSection>
  );
};

export default LBeneficiariesView;
