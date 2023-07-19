import classNames from 'classnames';
import type { FC } from 'react';

import { Icon } from '@wf/components';

import type { ILDocumentHistoryTBodyProps, ILDocumentHistoryTHeaderItem } from './LDocumentHistoryTBodyViewTypes';
import LDocumentHistoryTBodyViewTexts from './LDocumentHistoryTBodyViewTexts';
import { getFormatDate } from '../../../../helpers/getFormatDate';
import { StatusesList } from '../../../Licenses/store/types';
import { OperationTypes } from '../../../License/constants';
import Table from '../../../../components/Table';

import { removeLastWordStartUnderline } from '../../../../helpers';
import type { IDocumentHistoryItem } from '../../store/types';

import styles from './LDocumentHistoryTBodyView.module.scss';

const tableHeaders: Array<ILDocumentHistoryTHeaderItem> = [
  { name: LDocumentHistoryTBodyViewTexts.OPERATION_DATE, flex: 2 },
  { name: LDocumentHistoryTBodyViewTexts.USER, flex: 2 },
  { name: LDocumentHistoryTBodyViewTexts.COMMITED_OPERATIONS, flex: 2 },
  { name: LDocumentHistoryTBodyViewTexts.NEW_STATUSES, flex: 2 },
  { name: '', flex: 1 },
];

const LDocumentHistoryTBodyView: FC<ILDocumentHistoryTBodyProps> = ({
  data,
  dataCount,
  emptyDataTitle,
  emptyDataText,
}) => (
  <Table
    emptyDataTitle={emptyDataTitle}
    emptyDataText={emptyDataText}
    tableHeaders={tableHeaders}
    dataCount={dataCount}
  >
    {data.map((item: IDocumentHistoryItem) => (
      <Table.Expandable key={item.modifiedOn}>
        <Table.Row className={styles.licenses_tb}>
          <Table.Cell className={styles.license_big_cell}>
            <div>{getFormatDate(item.modifiedOn)}</div>
            <span>{getFormatDate(item.modifiedOn, 'HH:mm:ss')}</span>
          </Table.Cell>
          <Table.Cell className={styles.license_big_cell}>{item.modifiedBy}</Table.Cell>
          <Table.Cell className={styles.license_big_cell}>
            {OperationTypes[item.operation as keyof typeof OperationTypes] ??
              removeLastWordStartUnderline(item.operation)}
          </Table.Cell>
          <Table.Cell className={styles.license_big_cell}>
            {StatusesList[item.status as keyof typeof StatusesList] ?? removeLastWordStartUnderline(item.status)}
          </Table.Cell>
          <Table.Cell
            className={classNames(styles.last_item, styles.license_cell)}
            expandOnClick={!!item.supportInfoMessage}
            align="right"
            withoutEllipsis
          >
            {item.supportInfoMessage && <Icon.UnreadCommentIcon size={17} />}
          </Table.Cell>
        </Table.Row>
        {item.supportInfoMessage && (
          <Table.Expandable.Content>
            <Table inner>
              <Table.Grid>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{item.supportInfoMessage}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Grid>
            </Table>
          </Table.Expandable.Content>
        )}
      </Table.Expandable>
    ))}
  </Table>
);

export default LDocumentHistoryTBodyView;
