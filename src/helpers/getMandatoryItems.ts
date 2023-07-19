import type { Dictionary, EntityId } from '@reduxjs/toolkit';
import type { FieldValues } from 'react-hook-form';

interface GetMandatoryItemsParam {
  mandatoryItemsArray: EntityId[];
  mandatoryItemsEntities: Dictionary<FieldValues>;
  entitiesFirstArr: Dictionary<FieldValues>;
  entitiesSecondArr: Dictionary<FieldValues>;
}

export function getMandatoryItems({
  mandatoryItemsArray,
  mandatoryItemsEntities,
  entitiesFirstArr,
  entitiesSecondArr,
}: GetMandatoryItemsParam) {
  return mandatoryItemsArray.reduce((acc: EntityId[], item: EntityId) => {
    const id = mandatoryItemsEntities[item]?.id;

    if (!entitiesFirstArr[id] && !entitiesSecondArr[id]) {
      acc.push(item);
    }

    return acc;
  }, []);
}
