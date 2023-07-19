import type { FC } from 'react';

import { Icon, Table } from '@wf/components';

import type { ITHeaderProps } from './TableTypes';

import styles from './Table.module.scss';

const THeader: FC<ITHeaderProps> = ({ tableHeaders }) => (
  <Table.Grid>
    <Table.Header>
      <Table.Row>
        {tableHeaders?.map((item) =>
          item.name === 'import_export' ? (
            <Table.HeaderCell
              style={{
                flex: item.flex,
              }}
              className={styles.specific_th}
              key={item.name}
            >
              <div className={styles.specific_th_item}>
                <span>Import</span>
                <span>Export</span>
              </div>
            </Table.HeaderCell>
          ) : (
            <Table.HeaderCell
              style={{
                flex: item.flex,
              }}
              className={styles.header_item}
              key={item.name}
            >
              <div className={styles.th_item}>
                {item.name}
                {item.icon && <Icon name={item.icon} size={17} />}
              </div>
            </Table.HeaderCell>
          )
        )}
      </Table.Row>
    </Table.Header>
  </Table.Grid>
);

export default THeader;
