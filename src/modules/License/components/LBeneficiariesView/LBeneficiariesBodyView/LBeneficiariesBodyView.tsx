import classNames from 'classnames';
import type { FC } from 'react';

import { ButtonTypes } from '../../../../../components/FlexableButton/FlexableButtonType';
import type { ILBeneficiariesViewProps } from './LBeneficiariesBodyViewType';
import FlexableButton from '../../../../../components/FlexableButton';
import { isBackId } from '../../../../../helpers/isBackId';
import Table from '../../../../../components/Table';

import { type IBeneficiaryItem, LicenseModeItems } from '../../../store/types';

import styles from './LBeneficiariesBodyView.module.scss';

const LBeneficiariesBodyView: FC<ILBeneficiariesViewProps> = ({
  beneficiaries,
  handleEditBeneficiary,
  handleDeleteBeneficiary,
  subDocsBeneficiaries,
  type,
  currentIndex,
  hasError,
}) => {
  const viewMode = type === LicenseModeItems.view;

  return (
    <>
      {beneficiaries.map((item: IBeneficiaryItem, index: number) => (
        <Table.Row hasError={hasError} key={item.id}>
          <Table.Cell className={classNames(styles.first_item, styles.item_cell)}>
            {currentIndex + index + 1}
          </Table.Cell>
          <Table.Cell className={styles.item_big_cell}>{item.code}</Table.Cell>
          <Table.Cell className={styles.item_big_cell}>{item.description}</Table.Cell>
          <Table.Cell className={styles.item_big_cell}>{item.phoneNumber}</Table.Cell>
          <Table.Cell className={styles.item_big_cell}>{item.email}</Table.Cell>
          <Table.Cell className={classNames(styles.last_item, styles.item_cell)}>
            {!viewMode && (
              <>
                {(subDocsBeneficiaries.delete || !isBackId(item.id)) && (
                  <FlexableButton type={ButtonTypes.delete} handleClick={() => handleDeleteBeneficiary(item.id)} />
                )}
                {(subDocsBeneficiaries.modify || !isBackId(item.id)) && (
                  <FlexableButton type={ButtonTypes.edit} handleClick={() => handleEditBeneficiary(item.id)} />
                )}
              </>
            )}
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default LBeneficiariesBodyView;
