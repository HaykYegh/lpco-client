import { QuotaType } from '../../../constants';

export const itemInfoDefaultValues = {
  commodityCode: null,
  commercialDescription: '',
  commodityDescription: '',
  countryOfOriginCode: null,
  manufacturerName: '',
  packageMark: '',
  packageNumber: null,
  packageTypeCode: null,
  requestedAmount: null,
  quotaType: QuotaType.UOM,
  itemInvoiceAmountInForeignCurrency: null,
  itemInvoiceAmountInNationalCurrency: null,
  grossMass: null,
};
