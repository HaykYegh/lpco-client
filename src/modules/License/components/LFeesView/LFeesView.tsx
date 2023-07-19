import { useSelector } from 'react-redux';
import classNames from 'classnames';
import type { FC } from 'react';

import { Tag } from '@wf/components';

import TabContentSection from '../../../../components/TabContentSection';
import type { ILFeesViewTHeaderItem } from './LFeesViewType';
import { lFeesAdapter } from '../../store/entityAdapters';
import Header from '../../../../components/Header';
import Table from '../../../../components/Table';

import { licenseFeesSelector, licensePropsSelector } from '../../store/selectors';
import type { IFeesItem } from '../../store/types';

import styles from './LFeesView.module.scss';

const tableHeaders: Array<ILFeesViewTHeaderItem> = [
  { name: '#', flex: 1 },
  { name: 'Code', flex: 3 },
  { name: 'Description', flex: 3 },
  { name: 'Receipt Number', flex: 3 },
  { name: 'Received Date', flex: 3 },
  { name: 'Base Amount', flex: 3 },
  { name: 'Rate', flex: 3 },
  { name: 'Amount', flex: 3 },
];

const LFeesView: FC = () => {
  const feesAdapterSelectors = lFeesAdapter.getSelectors();
  const feesData = useSelector(licenseFeesSelector);
  const allFees = feesAdapterSelectors.selectAll(feesData);

  const { amountToBePaid, totalAmount } = useSelector(licensePropsSelector);

  return (
    <TabContentSection>
      <Header
        rightContent={
          <div className={styles.bill_number_content}>
            <span>Bill Number:</span>
            <span className={styles.bill_number}>PHY329910421231</span>
            <Tag color="success">{amountToBePaid ? 'Unpaid' : 'Paid'}</Tag>
          </div>
        }
        title={<h2>List of Fees & Changes</h2>}
        className={styles.header_content}
      />
      <Table
        emptyDataText="This is place holder text. The basic dialog for tables"
        emptyDataTitle="There is no beneficiary added"
        tableHeaders={tableHeaders}
        dataCount={allFees.length}
      >
        {allFees.map((item: IFeesItem, index: number) => (
          <div key={item.id}>
            <Table.Row>
              <Table.Cell className={classNames(styles.first_item, styles.item_cell)}>{index + 1}</Table.Cell>
              <Table.Cell className={styles.item_big_cell}>{item.feeCode}</Table.Cell>
              <Table.Cell className={styles.item_big_cell}>{item.feeDescription}</Table.Cell>
              <Table.Cell className={styles.item_big_cell}>{item.receiptNumber}</Table.Cell>
              <Table.Cell className={styles.item_big_cell}>{item.paymentDate}</Table.Cell>
              <Table.Cell className={styles.item_big_cell}>{item.value}</Table.Cell>
              <Table.Cell className={styles.item_big_cell}>{item.rate}</Table.Cell>
              <Table.Cell
                className={classNames(styles.item_big_cell, styles.last_cell)}
                withoutEllipsis={true}
                align="right"
              >
                {item.amount}
              </Table.Cell>
            </Table.Row>
          </div>
        ))}
        <Table.Row className={styles.spec_row}>
          <div>Total Amount in XOF</div>
          <span>{amountToBePaid}</span>
        </Table.Row>
        <Table.Row className={styles.spec_row}>
          <div>Total Amount To Be Paid</div>
          <span>{totalAmount}</span>
        </Table.Row>
      </Table>
    </TabContentSection>
  );
};

export default LFeesView;
