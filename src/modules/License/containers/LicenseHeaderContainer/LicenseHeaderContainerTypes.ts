import type { UseFormReturn } from 'react-hook-form';

export interface ILicenseHeaderContainerProps {
  form: UseFormReturn;
  relatedProductsEnabled: boolean;
  relatedProducts: string;
  flowEnabled: boolean;
  flow: string;
  countryOfExportOrImportEnabled: boolean;
  typeOfUseEnabled: boolean;
  licenseCodeSearchValue: string;
  handleLicenseCodeChange: (value: string) => void;
  handleLicenseChange: (licenseTypeCode: string) => void;
  placeOfLoadingEnabled: boolean;
  placeOfUnloadingEnabled: boolean;
  invoiceValueManagementEnabled: boolean;
  termOfDeliveryEnabled: boolean;
}
