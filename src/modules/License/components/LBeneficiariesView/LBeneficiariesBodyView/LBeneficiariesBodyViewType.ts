import type { EntityId } from '@reduxjs/toolkit';

import type { ItemPermissions } from '../../../../../store/licenseType/types';

import type { IBeneficiaryItem } from '../../../store/types';

export interface ILBeneficiariesViewProps {
  beneficiaries: Array<IBeneficiaryItem>;
  handleEditBeneficiary: (id: EntityId) => void;
  handleDeleteBeneficiary: (id: EntityId) => void;
  subDocsBeneficiaries: ItemPermissions;
  type?: string;
  currentIndex: number;
  hasError?: boolean;
}
