import type { Dictionary, EntityId } from '@reduxjs/toolkit';
import type { FieldValues } from 'react-hook-form';

import { isValid } from './isValid';

export function getErrorItemsFromState(
  state: { ids: EntityId[]; entities: Dictionary<FieldValues> },
  validFields: Record<string, any>
) {
  const beneficiaryIds = state.ids;
  const beneficiaryEntities = state.entities;

  return beneficiaryIds.reduce(
    (acc: { fields: Array<FieldValues>; ids: Array<EntityId> }, item: EntityId) => {
      const currentItem = beneficiaryEntities[item] as FieldValues;
      const valid = isValid(validFields, currentItem);

      if (!valid) {
        acc.fields.push(currentItem);
        acc.ids.push(currentItem.id as EntityId);
      }

      return acc;
    },
    { fields: [], ids: [] }
  );
}
