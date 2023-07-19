import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { IAdditionalFieldItem, IApprovalAdItem, IAttachedDocumentItem, IFeeItem, ITransitionItem } from './types';

export const approvalsAdapter: EntityAdapter<IApprovalAdItem> = createEntityAdapter<IApprovalAdItem>({
  selectId: (approval) => approval.id as EntityId,
});

export const transitionsAdapter: EntityAdapter<ITransitionItem> = createEntityAdapter<ITransitionItem>({
  selectId: (transition) => transition.id as EntityId,
});

export const documentsAdapter: EntityAdapter<IAttachedDocumentItem> = createEntityAdapter<IAttachedDocumentItem>({
  selectId: (document) => document.code as EntityId,
});

export const feesAdapter: EntityAdapter<IFeeItem> = createEntityAdapter<IFeeItem>({
  selectId: (fee) => fee.id as EntityId,
});

export const feesAdapterForExtend: EntityAdapter<IFeeItem> = createEntityAdapter<IFeeItem>({
  selectId: (fee) => fee.id as EntityId,
});

export const additionalFieldsAdapter: EntityAdapter<IAdditionalFieldItem> = createEntityAdapter<IAdditionalFieldItem>({
  selectId: (additionalField) => additionalField.id as EntityId,
});
