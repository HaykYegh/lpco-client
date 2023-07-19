import type { EntityId } from '@reduxjs/toolkit';

import type { IBeneficiaryItem } from '../../store/types';

export interface ILBeneficiariesViewProps {
  allBeneficiaries: Array<IBeneficiaryItem>;
  allBeneficiariesWithErrors: Array<IBeneficiaryItem>;
  handleEditBeneficiary: (id: EntityId) => void;
  handleDeleteBeneficiary: (id: EntityId) => void;
  handleCreateBeneficiary: () => void;
  type?: string;
}

export interface ILBeneficiariesViewTHeaderItem {
  name: string;
  flex: number;
}
