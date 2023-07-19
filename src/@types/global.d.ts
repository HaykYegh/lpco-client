declare interface IWithReactChildren {
  children?: React.React.ReactNode | React.React.ReactNode[];
}

declare interface IErrorItem {
  code: string;
  field: string;
  message: string;
  messageArguments?: Array[string];
  messageCode?: string;
}

declare type SagaCallParamFuncType = {
  context: unknown;
  fn: (this: unknown, ...args: any[]) => any;
};

declare type ColorType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'caution'
  | 'typography'
  | 'background'
  | undefined;

declare type Nullable<T> = T | null;

declare type OptionsItemType = {
  label: string;
  value: string;
  tag?: TagItemType;
};

declare type TagItemType = {
  label: string | number;
} | null;

declare type DatePickerType = Date | [Date | null, Date | null] | null | undefined;
