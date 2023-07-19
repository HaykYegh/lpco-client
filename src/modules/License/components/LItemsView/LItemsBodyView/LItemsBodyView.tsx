import type { EntityId } from '@reduxjs/toolkit';
import { useWatch } from 'react-hook-form';
import classNames from 'classnames';
import type { FC } from 'react';

import { Button, color, Icon } from '@wf/components';

import { ButtonTypes } from '../../../../../components/FlexableButton/FlexableButtonType';
import { PopupFormMethods } from '../../../../../store/popupConfigs/types';
import FlexableButton from '../../../../../components/FlexableButton';
import type { ILItemsBodyViewProps } from './LItemsBodyViewType';
import { isBackId } from '../../../../../helpers/isBackId';
import Table from '../../../../../components/Table';

import { type IItemsItem, LicenseModeItems } from '../../../store/types';
import { QuotaTypeLabels } from '../../../constants';

import styles from './LItemsBodyView.module.scss';

const LItemsBodyView: FC<ILItemsBodyViewProps> = ({
  items,
  handleEditItem,
  handleDeleteItem,
  subDocsItems,
  type,
  currIndex,
  hasError,
  invoiceValueManagementEnabled,
}) => {
  const viewMode = type === LicenseModeItems.view;

  const invoiceCurrencyCode = useWatch({ name: 'invoiceCurrencyCode' });
  const invoiceCurrency = invoiceCurrencyCode?.value;
  const invoiceCurrencyCodeValue = invoiceCurrencyCode?.tag?.label ?? null;

  return (
    <>
      {items.map((item: IItemsItem, index: number) => (
        <Table.Row key={item.id} hasError={hasError}>
          <Table.Cell className={classNames(styles.first_item, styles.item_cell)}>{currIndex + index + 1}</Table.Cell>
          <Table.Cell className={styles.item_medium_cell}>{item.commodityCode}</Table.Cell>
          <Table.Cell className={styles.item_big_cell}>{item.commodityDescription}</Table.Cell>
          <Table.Cell className={styles.item_medium_cell}>{item.countryOfOriginCode}</Table.Cell>
          <Table.Cell className={styles.item_medium_cell}>{QuotaTypeLabels[item.quotaType]}</Table.Cell>
          {invoiceValueManagementEnabled && (
            <>
              <Table.Cell className={styles.item_medium_cell}>{item.itemInvoiceAmountInForeignCurrency}</Table.Cell>
              <Table.Cell className={styles.item_medium_cell}>{invoiceCurrency ?? ''}</Table.Cell>
              <Table.Cell className={styles.item_medium_cell}>{invoiceCurrencyCodeValue ?? ''}</Table.Cell>
              <Table.Cell className={styles.item_medium_cell}>
                {item.itemInvoiceAmountInForeignCurrency * invoiceCurrencyCodeValue || ''}
              </Table.Cell>
            </>
          )}
          <Table.Cell className={classNames(styles.last_item, styles.item_big_cell)}>
            {!viewMode && (
              <>
                <Button onClick={() => handleEditItem(item.id as EntityId, PopupFormMethods.VIEW)} secondary isSquare>
                  <Icon name="ic_eye" color={color('typography', 'light')} />
                </Button>
                {(subDocsItems.delete || !isBackId(item.id as number)) && (
                  <FlexableButton type={ButtonTypes.delete} handleClick={() => handleDeleteItem(item.id as EntityId)} />
                )}
                {(subDocsItems.modify || !isBackId(item.id as number)) && (
                  <FlexableButton type={ButtonTypes.edit} handleClick={() => handleEditItem(item.id as EntityId)} />
                )}
              </>
            )}
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default LItemsBodyView;
