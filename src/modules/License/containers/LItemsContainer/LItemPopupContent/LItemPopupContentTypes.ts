import { type QuotaTypeLabels } from '../../../constants';

export interface IItemFormData {
  commodityCode: OptionsItemType;
  commodityDescription: string;
  commercialDescription: string;
  countryOfOriginCode: OptionsItemType;
  manufacturerName: string;
  quotaType: keyof typeof QuotaTypeLabels;
  grossMass: number;
  netMass: number;
  packageTypeCode: OptionsItemType;
  packageMark: string;
  packageNumber: number;
  requestedAmount: number;
  approvedAmount: number;
  remainingAmount: number;
  itemInvoiceAmountInForeignCurrency: number;
  itemInvoiceAmountInNationalCurrency: number;
}
