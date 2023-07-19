import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { IItemFormData } from '../../../containers/LItemsContainer/LItemPopupContent/LItemPopupContentTypes';

import type { ICommodityItem } from '../../../../../store/commodities/types';
import type { ICountryItem } from '../../../../../store/countries/types';
import type { IPackageItem } from '../../../../../store/packages/types';
import type { IItemsOperationFields } from '../../../store/types';

export interface ILItemPopupViewProps {
  type?: string;
  form?: Record<string, any>;
  itemChangeMethod: string;
  showPopup: boolean;
  title: string;
  handleCreateItem: (data: IItemFormData) => void;
  handleUpdateItem: (data: IItemFormData) => void;
  handleClosePopup: () => void;
  countriesState: ICountryItem[];
  commoditiesState: ICommodityItem[];
  handleCommoditiesCodeChange: (value: string) => void;
  commodityCodeValue: string;
  handleCommodityChange: (commodityValue: string) => void;
  invoiceCurrencyCode: SelectBaseOption;
  mandatoryFields?: IItemsOperationFields;
  editableFields?: IItemsOperationFields;
  packagesState: Array<IPackageItem>;
  method?: string;
}
