import { type FC, type MouseEventHandler, useEffect } from 'react';

import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';

import { Button, Input, Select } from '@wf/components';

import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import type { ILBeneficiaryPopupViewProps } from './LBeneficiaryPopupContentViewViewType';
import LItemPopupContentViewTexts from './LBeneficiaryPopupContentViewTexts';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';
import Popup from '../../../../../components/Popup';
import Label from '../../../../../components/Label';

import { ChangeMethods } from '../../../store/types';

import styles from './LBeneficiaryPopupContentView.module.scss';

const LBeneficiaryPopupContentView: FC<ILBeneficiaryPopupViewProps> = ({
  form,
  itemChangeMethod,
  showPopup,
  title,
  handleCreateBeneficiary,
  handleUpdateBeneficiary,
  handleClosePopup,
  companiesState,
  handleCompaniesCodeChange,
  handleCompanyChange,
  companyCodeValue,
  mandatoryFields,
  editableFields,
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form as UseFormReturn;

  const beneficiary: OptionsItemType = useWatch({ name: 'beneficiary' });
  const beneficiaryValue: string = beneficiary?.value;

  const mandatoryEntities = mandatoryFields?.entities;
  const editableEntities = editableFields?.entities;

  useEffect(() => {
    handleCompanyChange(beneficiaryValue);
  }, [beneficiaryValue, handleCompanyChange]);

  return (
    <Popup title={title} showPopup={showPopup} handleClosePopup={handleClosePopup}>
      <div className={styles.content}>
        <div className={styles.content_body}>
          <SectionBody>
            <SectionRow>
              <Controller
                render={({ field }) => (
                  <Select
                    label={<Label mandatory={!!mandatoryEntities?.code}>Beneficiary Code</Label>}
                    options={createOptionsArrayFromData(companiesState, 'code', 'code')}
                    errorMessage={errors?.code?.message as string}
                    placeholder="Search beneficiary code"
                    {...field}
                    onInputChange={handleCompaniesCodeChange}
                    disabled={!editableEntities?.code}
                    inputValue={companyCodeValue}
                  />
                )}
                control={control}
                name="code"
              />
            </SectionRow>
            <SectionRow>
              <Input
                label={<Label>Beneficiary Name & Address</Label>}
                placeholder="Beneficiary name"
                textarea={true}
                disabled={true}
                {...register('description')}
              />
            </SectionRow>
            <hr />
            <SectionRow>
              <Input
                label={<Label mandatory={!!mandatoryEntities?.phoneNumber}>Beneficiary Phone</Label>}
                errorMessage={errors?.phoneNumber?.message as string}
                disabled={!editableEntities?.phoneNumber}
                placeholder="Write phone number"
                {...register('phoneNumber')}
              />
            </SectionRow>
            <SectionRow>
              <Input
                label={<Label mandatory={!!mandatoryEntities?.email}>Beneficiary Email</Label>}
                errorMessage={errors?.email?.message as string}
                disabled={!editableEntities?.email}
                placeholder="Write email"
                {...register('email')}
              />
            </SectionRow>
          </SectionBody>
        </div>
        <div className={styles.content_footer}>
          <Button
            onClick={
              handleSubmit(
                itemChangeMethod === ChangeMethods.EDIT
                  ? (handleUpdateBeneficiary as SubmitHandler<FieldValues>)
                  : (handleCreateBeneficiary as SubmitHandler<FieldValues>)
              ) as MouseEventHandler
            }
            color="success"
          >
            {itemChangeMethod === ChangeMethods.EDIT
              ? LItemPopupContentViewTexts.OPERATION_UPDATE_BUTTON_TEXT
              : LItemPopupContentViewTexts.OPERATION_ADD_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default LBeneficiaryPopupContentView;
