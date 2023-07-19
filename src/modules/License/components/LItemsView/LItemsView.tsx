import { type FC, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import { Alert } from '@wf/components';

import { licenseTypeFeatureFlagsByCodeSelector } from '../../../../store/licenseType/selectors';
import LItemPopupContent from '../../containers/LItemsContainer/LItemPopupContent';
import type { ILItemsViewProps, ILItemsViewTHeaderItem } from './LItemsViewType';
import TabContentSection from '../../../../components/TabContentSection';
import { HeaderItems } from '../../../../components/Header/HeaderTypes';
import Header from '../../../../components/Header';
import Table from '../../../../components/Table';
import LItemsBodyView from './LItemsBodyView';

import { LicenseModeItems } from '../../store/types';

import { licenseSubDocsItemsSelector } from '../../store/selectors';

import styles from './LItemsView.module.scss';

const tableHeaders: Array<ILItemsViewTHeaderItem> = [
  { name: '#', flex: 1 },
  { name: 'Commodity Code', flex: 2 },
  { name: 'Commodity Description', flex: 3 },
  { name: 'Country of Origin', flex: 2 },
  { name: 'Quota Type', flex: 2 },
];

const invoiceHeaders: Array<ILItemsViewTHeaderItem> = [
  { name: 'Invoice Value', flex: 2 },
  { name: 'Currency', flex: 2 },
  { name: 'Exchange Rate', flex: 2 },
  { name: 'Value in NPR', flex: 2 },
];

const LItemsView: FC<ILItemsViewProps> = ({
  allItems,
  allItemsWithErrors,
  handleEditItem,
  handleDeleteItem,
  type,
  handleCreateItem,
}) => {
  const [close, setClose] = useState(true);
  const viewMode = type === LicenseModeItems.view;
  const subDocsItems = useSelector(licenseSubDocsItemsSelector);

  const itemsWithErrorsLength: number = allItemsWithErrors.length;
  const itemsLength: number = allItems.length;
  const allItemsLength = itemsWithErrorsLength + itemsLength;

  const licenseTypeFeatureFlagsByCodeState = useSelector(licenseTypeFeatureFlagsByCodeSelector);
  const invoiceValueManagementEnabled = licenseTypeFeatureFlagsByCodeState.invoiceValueManagementEnabled;

  const handleClose = () => {
    setClose(!close);
  };

  const headerActions = useMemo(
    () => [
      {
        field: HeaderItems.button,
        text: 'Add New Item',
        color: 'success' as ColorType,
        name: 'add',
        leftIcon: 'ic_add',
        handleSubmit: handleCreateItem,
      },
    ],
    [handleCreateItem]
  );

  return (
    <TabContentSection>
      <Header
        actions={!viewMode && subDocsItems.add ? headerActions : null}
        className={styles.header_content}
        title={<h2>List of Items</h2>}
      />
      {!!itemsWithErrorsLength && close && (
        <Alert type="error" onClose={handleClose}>
          {`We have errors in ${itemsWithErrorsLength} items`}
        </Alert>
      )}
      {!itemsLength && !itemsWithErrorsLength && <Alert type="info">Need to have minimum 1 item</Alert>}
      <Table
        tableHeaders={[
          ...tableHeaders,
          ...(invoiceValueManagementEnabled ? invoiceHeaders : []),
          { name: '', flex: 3 },
        ]}
        emptyDataText="This is place holder text. The basic dialog for tables"
        emptyDataTitle="No item data yet"
        dataCount={allItemsLength}
      >
        <LItemsBodyView
          invoiceValueManagementEnabled={invoiceValueManagementEnabled}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
          subDocsItems={subDocsItems}
          items={allItemsWithErrors}
          hasError={true}
          currIndex={0}
          type={type}
        />
        <LItemsBodyView
          invoiceValueManagementEnabled={invoiceValueManagementEnabled}
          handleDeleteItem={handleDeleteItem}
          currIndex={itemsWithErrorsLength}
          handleEditItem={handleEditItem}
          subDocsItems={subDocsItems}
          items={allItems}
          type={type}
        />
      </Table>
      <LItemPopupContent />
    </TabContentSection>
  );
};

export default LItemsView;
