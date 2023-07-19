export type RestrictionType = {
  field: string;
  value: string;
  operator: string;
};

export interface IRimmSearchServiceTypes {
  type: string;
  offset?: number;
  max?: number;
  selectFields?: string[];
  restrictBy?: string;
  restrictions?: RestrictionType[];
}
