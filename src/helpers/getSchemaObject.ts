export type FieldItem = {
  field: string;
  type: string;
};

export interface IFields {
  entities: Record<string, Record<string, FieldItem>>;
  ids: string[];
}

export const getSchemaObject = (
  mandatoryFields: IFields,
  validObject: Record<string, any>,
  editableFields = mandatoryFields
) =>
  editableFields?.ids.reduce((acc: Record<string, any>, item: string) => {
    if (mandatoryFields?.entities?.[item]) {
      acc[item] = validObject[item];
    } else {
      acc[item] = validObject[item]?.notRequired();
    }

    return acc;
  }, {}) ?? {};
