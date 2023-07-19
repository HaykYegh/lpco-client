// eslint-disable-next-line max-len
import type { IBeneficiaryFormData } from '../../../containers/LBeneficiariesContainer/LBeneficiaryPopupContent/LBeneficiaryPopupContentTypes';

import type { ICompanyItem } from '../../../../../store/companies/types';
import type { IItemsOperationFields } from '../../../store/types';

export interface ILBeneficiaryPopupViewProps {
  type?: string;
  form?: Record<string, any>;
  itemChangeMethod: string;
  showPopup: boolean;
  title: string;
  handleCreateBeneficiary: (data: IBeneficiaryFormData) => void;
  handleUpdateBeneficiary: (data: IBeneficiaryFormData) => void;
  handleClosePopup: () => void;
  companiesState: ICompanyItem[];
  handleCompaniesCodeChange: (value: string) => void;
  handleCompanyChange: (beneficiaryValue: string) => void;
  companyCodeValue: string;
  mandatoryFields?: IItemsOperationFields;
  editableFields?: IItemsOperationFields;
}
