import classNames from 'classnames';
import type { FC } from 'react';

import { Button, color, Icon } from '@wf/components';

import { ButtonTypes } from '../../../../../components/FlexableButton/FlexableButtonType';
import type { ILAttDocumentsBodyViewProps } from './LAttDocumentsBodyViewType';
import FlexableButton from '../../../../../components/FlexableButton';
import { getFormatDate } from '../../../../../helpers/getFormatDate';
import { isBackId } from '../../../../../helpers/isBackId';
import Table from '../../../../../components/Table';

import { type IAttDocument, LicenseModeItems } from '../../../store/types';

import { LPCO_SERVER } from '../../../../../config';

import styles from './LAttDocumentsBodyView.module.scss';

const LAttDocumentsBodyView: FC<ILAttDocumentsBodyViewProps> = ({
  attAttDocuments,
  handleEditAttDocument,
  type,
  handleToggleModal,
  subDocsAttDocuments,
  currIndex,
  hasError,
}) => {
  const viewMode = type === LicenseModeItems.view;

  return (
    <>
      {attAttDocuments.map((item: IAttDocument, index: number) => (
        <Table.Row key={item.id} hasError={hasError}>
          <Table.Cell className={classNames(styles.first_item, styles.item_cell)}>{currIndex + index + 1}</Table.Cell>
          <Table.Cell className={styles.item_middle_cell}>{item.code}</Table.Cell>
          <Table.Cell className={styles.item_big_cell}>{item.name}</Table.Cell>
          <Table.Cell className={styles.item_middle_cell}>{item.referenceNumber}</Table.Cell>
          <Table.Cell className={styles.item_middle_cell}>{getFormatDate(item.attachmentDate)}</Table.Cell>
          <Table.Cell className={classNames(styles.last_item, styles.item_cell)}>
            {item.fileUrl && (
              <a href={`${LPCO_SERVER}/attDoc/download?fileUrl=${item.fileUrl}`} target="blank">
                <Button secondary isSquare>
                  <Icon name="ic_eye" color={color('typography', 'light')} />
                </Button>
              </a>
            )}
            {!viewMode && (
              <>
                {(subDocsAttDocuments.delete || !isBackId(item.id)) && (
                  <FlexableButton type={ButtonTypes.delete} handleClick={handleToggleModal} id={item.id} />
                )}
                {(subDocsAttDocuments.modify || !isBackId(item.id)) && (
                  <FlexableButton type={ButtonTypes.edit} handleClick={() => handleEditAttDocument(item.id)} />
                )}
              </>
            )}
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default LAttDocumentsBodyView;
