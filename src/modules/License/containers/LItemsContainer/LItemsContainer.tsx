import { type FC, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import type { EntityId } from '@reduxjs/toolkit';

import { PopupFormMethods, PopupNames } from '../../../../store/popupConfigs/types';
import { itemsAdapter, itemsWithErrorsAdapter } from '../../store/entityAdapters';
import { addPopupConfig } from '../../../../store/popupConfigs/slices';
import { useTypeInPath } from '../../../../hooks/useTypeInPath';
import LItemsView from '../../components/LItemsView';

import { licenseItemsSelector, licenseItemsWithErrorsSelector } from '../../store/selectors';
import { removeLicenseItem, removeLicenseItemWithErrors } from '../../store/slices';

const LItemsContainer: FC = () => {
  const { type } = useTypeInPath();
  const dispatch = useDispatch();

  const itemsAdapterSelectors = itemsAdapter.getSelectors();
  const itemsData = useSelector(licenseItemsSelector);
  const allItems = itemsAdapterSelectors.selectAll(itemsData);

  const itemsWithErrorsAdapterSelectors = itemsWithErrorsAdapter.getSelectors();
  const itemsWithErrorsData = useSelector(licenseItemsWithErrorsSelector);
  const allItemsWithErrors = itemsWithErrorsAdapterSelectors.selectAll(itemsWithErrorsData);

  const handleCreateItem = useCallback(() => {
    dispatch(
      addPopupConfig({
        name: PopupNames.ITEMS,
        data: {},
        title: '',
        show: true,
        method: PopupFormMethods.CREATE,
      })
    );
  }, [dispatch]);

  const handleEditItem = (id: EntityId, method: string = PopupFormMethods.UPDATE) => {
    const data = itemsData.entities[id] ?? (itemsWithErrorsData.entities[id] as Record<string, any>);
    dispatch(
      addPopupConfig({
        name: PopupNames.ITEMS,
        data,
        title: '',
        show: true,
        method,
      })
    );
  };

  const handleDeleteItem = (id: EntityId) => {
    if (itemsWithErrorsData.entities[id]) {
      dispatch(removeLicenseItemWithErrors(id));
    } else {
      dispatch(removeLicenseItem(id));
    }
  };

  return (
    <LItemsView
      allItemsWithErrors={allItemsWithErrors}
      handleDeleteItem={handleDeleteItem}
      handleCreateItem={handleCreateItem}
      handleEditItem={handleEditItem}
      allItems={allItems}
      type={type}
    />
  );
};

export default LItemsContainer;
