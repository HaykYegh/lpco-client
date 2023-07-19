import { type FC, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import type { EntityId } from '@reduxjs/toolkit';

import { beneficiariesAdapter, beneficiariesWithErrorsAdapter } from '../../store/entityAdapters';
import { PopupFormMethods, PopupNames } from '../../../../store/popupConfigs/types';
import { addPopupConfig } from '../../../../store/popupConfigs/slices';
import LBeneficiariesView from '../../components/LBeneficiariesView';
import { useTypeInPath } from '../../../../hooks/useTypeInPath';

import { licenseBeneficiariesSelector, licenseBeneficiariesWithErrorsSelector } from '../../store/selectors';
import { removeLicenseBeneficiary, removeLicenseBeneficiaryWithErrors } from '../../store/slices';

const LBeneficiariesContainer: FC = () => {
  const { type } = useTypeInPath();
  const dispatch = useDispatch();

  const beneficiariesAdapterSelectors = beneficiariesAdapter.getSelectors();
  const beneficiariesData = useSelector(licenseBeneficiariesSelector);
  const allBeneficiaries = beneficiariesAdapterSelectors.selectAll(beneficiariesData);

  const beneficiariesWithErrorsAdapterSelectors = beneficiariesWithErrorsAdapter.getSelectors();
  const beneficiariesWithErrorsData = useSelector(licenseBeneficiariesWithErrorsSelector);
  const allBeneficiariesWithErrors = beneficiariesWithErrorsAdapterSelectors.selectAll(beneficiariesWithErrorsData);

  const handleCreateBeneficiary = useCallback(() => {
    dispatch(
      addPopupConfig({
        name: PopupNames.BENEFICIARIES,
        data: {},
        title: '',
        show: true,
        method: PopupFormMethods.CREATE,
      })
    );
  }, [dispatch]);

  const handleEditBeneficiary = (id: EntityId) => {
    const data = beneficiariesData.entities[id] ?? (beneficiariesWithErrorsData.entities[id] as Record<string, any>);
    dispatch(
      addPopupConfig({
        name: PopupNames.BENEFICIARIES,
        data,
        title: '',
        show: true,
        method: PopupFormMethods.UPDATE,
      })
    );
  };

  const handleDeleteBeneficiary = (id: EntityId) => {
    if (beneficiariesWithErrorsData.entities[id]) {
      dispatch(removeLicenseBeneficiaryWithErrors(id));
    } else {
      dispatch(removeLicenseBeneficiary(id));
    }
  };

  return (
    <LBeneficiariesView
      allBeneficiariesWithErrors={allBeneficiariesWithErrors}
      handleDeleteBeneficiary={handleDeleteBeneficiary}
      handleCreateBeneficiary={handleCreateBeneficiary}
      handleEditBeneficiary={handleEditBeneficiary}
      allBeneficiaries={allBeneficiaries}
      type={type}
    />
  );
};

export default LBeneficiariesContainer;
