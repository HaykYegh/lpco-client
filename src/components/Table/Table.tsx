import type { FC } from 'react';

import { Icon, Pagination, Table as WFTable } from '@wf/components';

import type { ITableComponentProps } from './TableTypes';
import THeader from './THeader';
import FItems from './FItems';

import { DEFAULT_COUNT, PAGINATION_LIMIT } from '../../constatnts';

import styles from './Table.module.scss';

const Table: FC<ITableComponentProps> = ({
  filterItems,
  tableHeaders,
  children,
  dataCount,
  onPageChange,
  emptyDataTitle,
  emptyDataText,
  inner,
}) => (
  <WFTable inner={inner} className={styles.table_content}>
    {filterItems && <FItems filterItems={filterItems} />}
    <THeader tableHeaders={tableHeaders} />
    <WFTable.Body>{children}</WFTable.Body>
    {emptyDataTitle && (
      <WFTable.Footer>
        {dataCount ? (
          <div className={styles.footer_item}>
            <p>
              Total number of records: <span>{dataCount}</span>
            </p>
            {onPageChange && dataCount > PAGINATION_LIMIT && (
              <Pagination onPageChange={onPageChange} totalItems={(dataCount * DEFAULT_COUNT) / PAGINATION_LIMIT} />
            )}
          </div>
        ) : (
          <div className={styles.empty_data}>
            <Icon name="ministry" size={33} />
            {emptyDataTitle && <h3>{emptyDataTitle}</h3>}
            {emptyDataText && <p>{emptyDataText}</p>}
          </div>
        )}
      </WFTable.Footer>
    )}
  </WFTable>
);

export default Table;
