import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import type { ILicensesTBodyProps, ILicensesTHeaderItem } from './LicensesTBodyViewTypes';
import LicensesTBodyViewTextse from './LicensesTBodyViewTexts';
import Table from '../../../../components/Table';

import { StatusesList } from '../../store/types';

import { removeLastWordStartUnderline } from '../../../../helpers';
import type { ILpcoSearchItem } from '../../store/types';

import styles from './LicensesTBodyView.module.scss';

const tableHeaders: Array<ILicensesTHeaderItem> = [
  { name: LicensesTBodyViewTextse.STATUS, flex: 2 },
  { name: LicensesTBodyViewTextse.TYPE_OF_LPCO, flex: 2 },
  { name: LicensesTBodyViewTextse.USER_REF_NUMBER, flex: 2 },
  { name: LicensesTBodyViewTextse.APPROVAL_REF, flex: 2 },
  { name: LicensesTBodyViewTextse.APPROVAL_DATE, flex: 2 },
  { name: LicensesTBodyViewTextse.COMPANY_CODE, flex: 2 },
];

const LicensesTBodyView: FC<ILicensesTBodyProps> = ({
  data,
  dataCount,
  handlePageChange,
  tableFilterItems,
  emptyDataTitle,
  emptyDataText,
}) => {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`);
  };

  return (
    <Table
      onPageChange={handlePageChange}
      emptyDataTitle={emptyDataTitle}
      filterItems={tableFilterItems}
      emptyDataText={emptyDataText}
      tableHeaders={tableHeaders}
      dataCount={dataCount}
    >
      {data.map((item: ILpcoSearchItem) => (
        <Table.Row className={styles.licenses_tb} key={item.id} onClick={() => handleEdit(item.id)}>
          <Table.Cell className={styles.license_big_cell}>
            {StatusesList[item.status as keyof typeof StatusesList] ?? removeLastWordStartUnderline(item.status)}
          </Table.Cell>
          <Table.Cell className={styles.license_big_cell}>{item.licenseType}</Table.Cell>
          <Table.Cell className={styles.license_big_cell}>{item.userReferenceNumber}</Table.Cell>
          <Table.Cell className={styles.license_big_cell}>{item.approvalReference}</Table.Cell>
          <Table.Cell className={styles.license_big_cell}>{item.approvalDate}</Table.Cell>
          <Table.Cell className={styles.license_big_cell}>{item.companyCode}</Table.Cell>
        </Table.Row>
      ))}
    </Table>
  );
};

export default LicensesTBodyView;
