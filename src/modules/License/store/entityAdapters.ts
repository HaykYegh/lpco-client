import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { IAttDocument, IBeneficiaryItem, IFeesItem, IItemsItem, IOperationItem } from './types';

export const attDocumentsAdapter: EntityAdapter<IAttDocument> = createEntityAdapter<IAttDocument>({
  selectId: (document) => document.id as EntityId,
});

export const itemsAdapter: EntityAdapter<IItemsItem> = createEntityAdapter<IItemsItem>({
  selectId: (item) => item.id as EntityId,
});

export const lFeesAdapter: EntityAdapter<IFeesItem> = createEntityAdapter<IFeesItem>({
  selectId: (fee) => fee.id as EntityId,
});

export const beneficiariesAdapter: EntityAdapter<IBeneficiaryItem> = createEntityAdapter<IBeneficiaryItem>({
  selectId: (beneficiary) => beneficiary.id as EntityId,
});

export const operationsAdapter: EntityAdapter<IOperationItem> = createEntityAdapter<IOperationItem>({
  selectId: (operation) => operation.name as EntityId,
});

export const attDocumentsWithErrorsAdapter: EntityAdapter<IAttDocument> = createEntityAdapter<IAttDocument>({
  selectId: (document) => document.id as EntityId,
});

export const itemsWithErrorsAdapter: EntityAdapter<IItemsItem> = createEntityAdapter<IItemsItem>({
  selectId: (item) => item.id as EntityId,
});

export const beneficiariesWithErrorsAdapter: EntityAdapter<IBeneficiaryItem> = createEntityAdapter<IBeneficiaryItem>({
  selectId: (beneficiary) => beneficiary.id as EntityId,
});
