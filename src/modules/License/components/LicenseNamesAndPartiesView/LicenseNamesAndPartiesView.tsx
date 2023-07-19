import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { useKeycloakContext } from '@wf/keycloak-axios-provider';
import { Input, Select } from '@wf/components';

import { type IUserInfo } from '../../../AppLayout/components/SideBarHeader/SideBarHeaderTypes';
import { createOptionsArrayFromData } from '../../../../helpers/createOptionsArrayFromData';
import type { ILicenseNamesAndPartiesViewProps } from './LicenseNamesAndPartiesViewTypes';
import RightItemWithOneField from '../../../../components/RightItemWithOneField';
import TabContentSection from '../../../../components/TabContentSection';
import RowWithTwoField from '../../../../components/RowWithTwoField';
import { useTypeInPath } from '../../../../hooks/useTypeInPath';
import FieldContent from '../../../../components/FieldContent';
import SectionBody from '../../../../components/SectionBody';
import TabContent from '../../../../components/TabContent';
import SectionRow from '../../../../components/SectionRow';
import Label from '../../../../components/Label';

import { type ConfigFieldItem, LicenseModeItems, licensePropsEnum } from '../../store/types';

import { declarantsSelector } from '../../../../store/declarants/selectors';
import { ApplicationRoles } from '../../../../constatnts';

const LicenseNamesAndPartiesView: FC<ILicenseNamesAndPartiesViewProps> = ({
  form,
  handleCompanyCodeChange,
  handleSetCompanyCode,
  allCompanies,
  companyCodeSearchValue,
  licenseMandatoryFieldsState,
  licenseEditableFieldsState,
}) => {
  const user: IUserInfo = useKeycloakContext()?.getUserData();
  const { type } = useTypeInPath();

  const viewMode = type === LicenseModeItems.view;

  const userRoles = user?.roles?.lpco2 ?? [];
  const hasDeclarant = userRoles.includes(ApplicationRoles.ROLE_LPCO2_DECLARANT);

  const declarantsData = useSelector(declarantsSelector);

  const {
    control,
    formState: { errors },
    register,
    watch,
  } = form;

  const companyAddressWatch = watch(licensePropsEnum.companyAddress);
  const declarantCode = watch(licensePropsEnum.declarantCode);
  const declarantName = declarantsData.entities?.[declarantCode]?.description ?? '';

  const lpcoMandatory = licenseMandatoryFieldsState?.lpco?.entities as Record<string, ConfigFieldItem>;
  const lpcoEditable = licenseEditableFieldsState?.lpco?.entities as Record<string, ConfigFieldItem>;
  const isCompanyCodeMandatory = !!lpcoMandatory?.[licensePropsEnum.companyCode];
  const isCompanyDescriptionMandatory = !!lpcoMandatory?.[licensePropsEnum.companyDescription];
  const isCompanyPhoneMandatory = !!lpcoMandatory?.[licensePropsEnum.companyPhone];
  const isCompanyEmailMandatory = !!lpcoMandatory?.[licensePropsEnum.companyEmail];

  return (
    <TabContent>
      <TabContentSection>
        <SectionBody>
          {hasDeclarant && (
            <>
              <SectionRow>
                <FieldContent
                  textContent={watch(licensePropsEnum.declarantCode)}
                  label={<Label>Declarant Code</Label>}
                  viewMode={viewMode}
                >
                  <Input
                    errorMessage={errors?.[licensePropsEnum.declarantCode]?.message as string}
                    label={<Label>Declarant Code</Label>}
                    placeholder="Declarant Code"
                    disabled
                    {...register(licensePropsEnum.declarantCode)}
                  />
                </FieldContent>
                <RightItemWithOneField>
                  <FieldContent
                    textContent={watch(licensePropsEnum.declarantName)}
                    label={<Label>Declarant Name</Label>}
                    viewMode={viewMode}
                  >
                    <Input
                      errorMessage={errors?.[licensePropsEnum.declarantName]?.message as string}
                      label={<Label>Declarant Name</Label>}
                      placeholder="Declarant Name"
                      value={declarantName}
                      disabled
                      {...register(licensePropsEnum.declarantName)}
                    />
                  </FieldContent>
                </RightItemWithOneField>
              </SectionRow>
              <hr />
            </>
          )}
          <SectionRow>
            <RowWithTwoField>
              <FieldContent
                label={<Label mandatory={isCompanyCodeMandatory}>Company Code and Name</Label>}
                textContent={watch(licensePropsEnum.companyCode)?.label}
                viewMode={viewMode}
              >
                <Controller
                  render={({ field }) => (
                    <Select
                      options={createOptionsArrayFromData(allCompanies, 'code', 'code', 'description')}
                      label={<Label mandatory={isCompanyCodeMandatory}>Company Code and Name</Label>}
                      errorMessage={errors?.[licensePropsEnum.companyCode]?.message as string}
                      placeholder="Choose company code"
                      isClearable
                      {...field}
                      onChange={(selected: OptionsItemType) => {
                        field.onChange(selected);
                        handleSetCompanyCode(selected?.value);
                      }}
                      disabled={!lpcoEditable?.[licensePropsEnum.companyCode]}
                      onInputChange={handleCompanyCodeChange}
                      inputValue={companyCodeSearchValue}
                    />
                  )}
                  name={licensePropsEnum.companyCode}
                  control={control}
                />
              </FieldContent>
            </RowWithTwoField>
          </SectionRow>
          <SectionRow>
            <RowWithTwoField>
              <FieldContent
                label={<Label mandatory={isCompanyDescriptionMandatory}>Company Address</Label>}
                textContent={companyAddressWatch}
                viewMode={viewMode}
              >
                <Input
                  label={<Label mandatory={isCompanyDescriptionMandatory}>Company Address</Label>}
                  errorMessage={errors?.[licensePropsEnum.companyDescription]?.message as string}
                  disabled={!lpcoEditable?.[licensePropsEnum.companyDescription]}
                  placeholder="Company Address"
                  value={companyAddressWatch}
                  textarea
                />
              </FieldContent>
            </RowWithTwoField>
          </SectionRow>
          <SectionRow>
            <RowWithTwoField>
              <FieldContent
                label={<Label mandatory={isCompanyPhoneMandatory}>Company Phone</Label>}
                textContent={watch(licensePropsEnum.companyPhone)}
                viewMode={viewMode}
              >
                <Input
                  errorMessage={errors?.[licensePropsEnum.companyPhone]?.message as string}
                  label={<Label mandatory={isCompanyPhoneMandatory}>Company Phone</Label>}
                  disabled={!lpcoEditable?.[licensePropsEnum.companyPhone]}
                  placeholder="Write company phone"
                  {...register(licensePropsEnum.companyPhone)}
                />
              </FieldContent>
            </RowWithTwoField>
          </SectionRow>
          <SectionRow>
            <RowWithTwoField>
              <FieldContent
                label={<Label mandatory={isCompanyEmailMandatory}>Company Email</Label>}
                textContent={watch(licensePropsEnum.companyEmail)}
                viewMode={viewMode}
              >
                <Input
                  errorMessage={errors?.[licensePropsEnum.companyEmail]?.message as string}
                  label={<Label mandatory={isCompanyEmailMandatory}>Company Email</Label>}
                  disabled={!lpcoEditable?.[licensePropsEnum.companyEmail]}
                  placeholder="Write company email"
                  {...register(licensePropsEnum.companyEmail)}
                />
              </FieldContent>
            </RowWithTwoField>
          </SectionRow>
        </SectionBody>
      </TabContentSection>
    </TabContent>
  );
};

export default LicenseNamesAndPartiesView;
