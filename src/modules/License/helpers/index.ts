import { type EntityId } from '@reduxjs/toolkit';

import { type ActionType, HeaderItems } from '../../../components/Header/HeaderTypes';
import type { IGetLicenseHeaderActionsParams } from './helpersParamsTypes';

import {
  type ConfigFieldItem,
  type IItemsItem,
  type IItemsOperationFields,
  type IOperationFields,
  type IOperationItem,
  LicenseModeItems,
  type OperationConfig,
  OperationFields,
} from '../store/types';
import { OperationTypes } from '../constants';

import { removeLastWordStartUnderline } from '../../../helpers';

export const getLicenseHeaderActions = ({ type, id, groupIds, handleSubmit }: IGetLicenseHeaderActionsParams) => {
  switch (type) {
    case LicenseModeItems.create:
    case LicenseModeItems.edit:
      return getOperationFields(groupIds, handleSubmit);
    case LicenseModeItems.view:
      return [
        {
          field: HeaderItems.button,
          text: 'Edit',
          color: 'typography' as ColorType,
          secondary: true,
          name: 'edit',
          link: `/edit/${id as string}`,
        },
      ];
    default:
      return null;
  }
};

export function getOperationFields(groupIds?: Array<EntityId>, handleSubmit?: (name: string) => Promise<void>) {
  return groupIds?.map((item: EntityId) => ({
    field: HeaderItems.button,
    text: OperationTypes[item as keyof typeof OperationTypes] ?? removeLastWordStartUnderline(item as string),
    color: 'success' as ColorType,
    outlined: true,
    name: item,
    handleSubmit,
  })) as ActionType[];
}

export const createObjectDependsConfigArr = (configArr: Array<string>, type: string) =>
  configArr.reduce(
    (acc: IItemsOperationFields, item: string) => {
      const itemArr = item.split('.');
      const accKey = itemArr[0] as string;
      const accValue = itemArr[1] as string;

      if (!acc.entities[accKey]) {
        acc.entities[accKey] = { entities: {}, ids: [] };
        acc.ids.push(accKey);
      }

      if (!(acc.entities[accKey] as Record<string, any>).entities.accValue) {
        (acc.entities[accKey] as Record<string, any>).entities = {
          ...(acc.entities[accKey] as Record<string, any>).entities,
          [accValue]: { field: accValue, type },
        };
        (acc.entities[accKey] as Record<string, any>).ids.push(accValue);
      }

      return acc;
    },
    { entities: {}, ids: [] }
  );

export const createOperationsArray = (configs: Record<string, OperationConfig>) =>
  Object.keys(configs).reduce((acc: Array<IOperationItem>, item: string, index, array) => {
    const configObj = configs[item] as OperationConfig;
    const prevItem = array[index - 1] ?? item;
    const prevConfigMandatoryArr = configs[prevItem]?.mandatoryFields ?? [];
    const prevConfigMandatoryArrLength = prevConfigMandatoryArr.length;
    const currentConfigMandatoryArrLength = configObj.mandatoryFields.length;
    let smallestLengthMandatoryFields;
    let smallestLengthMandatoryProp: string;

    if (currentConfigMandatoryArrLength <= prevConfigMandatoryArrLength) {
      smallestLengthMandatoryFields = configObj.mandatoryFields;
      smallestLengthMandatoryProp = item;
    } else {
      smallestLengthMandatoryFields = prevConfigMandatoryArr;
      smallestLengthMandatoryProp = prevItem;
    }

    const mandatoryFields = createObjectDependsConfigArr(configObj.mandatoryFields, OperationFields.MANDATORY);
    const optionalFields = createObjectDependsConfigArr(configObj.optionalFields, OperationFields.OPTIONAL);
    const editableIdsArr = new Set([...mandatoryFields.ids, ...optionalFields.ids]);
    const mandatoryFieldsCopy = structuredClone(mandatoryFields);
    const editableFields = {
      entities: { ...mandatoryFieldsCopy.entities },
      ids: [...editableIdsArr],
    };

    for (const prop in optionalFields.entities) {
      if (!editableFields.entities[prop]) {
        editableFields.entities[prop] = optionalFields.entities[prop] as Record<string, ConfigFieldItem>;
      }

      const editableFieldsObj = editableFields.entities[prop] as Record<string, any>;
      const optionalFieldsObj = optionalFields.entities[prop] as Record<string, any>;

      if (editableFieldsObj?.entities) {
        editableFieldsObj.entities = {
          ...editableFieldsObj?.entities,
          ...optionalFieldsObj?.entities,
        };
        const idsArr = new Set([...editableFieldsObj.ids, ...optionalFieldsObj.ids]);
        editableFieldsObj.ids = [...idsArr];
      }
    }

    const operationObj = {
      mandatoryFields,
      optionalFields,
      editableFields,
      smallestLengthMandatoryFields,
      smallestLengthMandatoryProp,
      name: item,
    };
    acc.push(operationObj);

    return acc;
  }, []);

export const replaceFields = (
  operation: Record<string, ConfigFieldItem>,
  mandatoryFields: IOperationFields,
  item: string
) => {
  for (const name in operation) {
    operation[name] = {
      field: (operation[name] as Record<string, any>)?.field as string,
      type: mandatoryFields.entities[item]?.entities?.[name] ? OperationFields.MANDATORY : OperationFields.OPTIONAL,
    };
  }

  return operation;
};

export const createEditableAndMandatoryFields = (operations: Array<IOperationItem>) => {
  const lastOperation = operations[operations.length - 1];
  const smallestLengthMandatoryFields = lastOperation?.smallestLengthMandatoryFields ?? [];

  const mandatoryFields = smallestLengthMandatoryFields.reduce(
    (acc: IOperationFields, item: string) => {
      const fieldArr: string[] = item.split('.');
      const fieldProp = fieldArr[0] as string;
      const fieldValue = fieldArr[1] as string;
      const isMandatory = operations.every(
        (el: IOperationItem) =>
          (el.mandatoryFields.entities[fieldProp]?.entities as Record<string, ConfigFieldItem>)?.[fieldValue]
      );

      if (isMandatory) {
        if (!acc.entities[fieldProp]) {
          acc.ids.push(fieldProp);
          acc.entities[fieldProp] = { entities: {}, ids: [] };
        }

        const operationFields = acc.entities[fieldProp] as Record<string, any>;
        operationFields.entities = {
          ...(acc.entities[fieldProp]?.entities ?? {}),
          [fieldValue]: { field: fieldValue, type: OperationFields.MANDATORY },
        };
        operationFields.ids.push(fieldValue);
      }

      return acc;
    },
    { entities: {}, ids: [] }
  );

  const editableFields = operations.reduce(
    (acc: IOperationFields, item: IOperationItem) => {
      const editableFields = item.editableFields.entities;

      Object.keys(editableFields).forEach((el: string) => {
        if (!acc.entities[el]) {
          acc.ids.push(el);
          acc.entities[el] = { entities: {}, ids: [...Object.keys(editableFields[el]?.entities ?? {})] };
        }

        const operationFields = acc.entities[el] as Record<string, any>;

        operationFields.entities = { ...(acc.entities[el]?.entities ?? {}), ...editableFields[el]?.entities };

        const operation = (acc.entities[el] as any).entities as unknown as Record<string, ConfigFieldItem>;

        replaceFields(operation, mandatoryFields, el);
      });

      return acc;
    },
    { entities: {}, ids: [] }
  );

  return { editableFields, mandatoryFields };
};

// eslint-disable-next-line max-len
export const getTotalInvoiceValue = (items: IItemsItem[]) =>
  items.reduce((acc: number, item: IItemsItem) => acc + item.itemInvoiceAmountInForeignCurrency, 0);
