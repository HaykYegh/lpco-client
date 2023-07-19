import { type FC, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import type { EntityId } from '@reduxjs/toolkit';

import { attDocumentsAdapter, attDocumentsWithErrorsAdapter } from '../../store/entityAdapters';
import { PopupFormMethods, PopupNames } from '../../../../store/popupConfigs/types';
import { addPopupConfig } from '../../../../store/popupConfigs/slices';
import type { ModalOptionsState } from './LAttDocumentsContainerTypes';
import LAttDocumentsView from '../../components/LAttDocumentsView';
import { useTypeInPath } from '../../../../hooks/useTypeInPath';

import { removeLicenseAttachedDocument, removeLicenseAttachedDocumentWithErrors } from '../../store/slices';
import { licenseAttDocumentsSelector, licenseAttDocumentsWithErrorsSelector } from '../../store/selectors';

const LAttDocumentsContainer: FC = () => {
  const { type } = useTypeInPath();
  const dispatch = useDispatch();
  const [modalOptions, setModalOptions] = useState<ModalOptionsState>({
    isOpen: false,
    id: null,
  });

  const attDocumentsAdapterSelectors = attDocumentsAdapter.getSelectors();
  const attDocumensData = useSelector(licenseAttDocumentsSelector);
  const allAttDocuments = attDocumentsAdapterSelectors.selectAll(attDocumensData);

  const attDocumentsAdapterWithErrorsSelectors = attDocumentsWithErrorsAdapter.getSelectors();
  const attDocumensWithErrorsData = useSelector(licenseAttDocumentsWithErrorsSelector);
  const allAttDocumentsWithErrors = attDocumentsAdapterWithErrorsSelectors.selectAll(attDocumensWithErrorsData);

  const handleCreateAttDocument = useCallback(() => {
    dispatch(
      addPopupConfig({
        name: PopupNames.ATT_DOCUMENTS,
        data: {},
        title: '',
        show: true,
        method: PopupFormMethods.CREATE,
      })
    );
  }, [dispatch]);

  const handleEditAttDocument = (id: EntityId) => {
    if (id) {
      const data = attDocumensData.entities[id] ?? (attDocumensWithErrorsData.entities[id] as Record<string, any>);
      dispatch(
        addPopupConfig({
          name: PopupNames.ATT_DOCUMENTS,
          data,
          title: '',
          show: true,
          method: PopupFormMethods.UPDATE,
        })
      );
    }
  };

  const handleToggleModal = useCallback(
    (id?: EntityId) => {
      setModalOptions({ id: id ?? null, isOpen: !modalOptions.isOpen });
    },
    [modalOptions.isOpen]
  );

  const handleDeleteAttDocument = (id: EntityId) => {
    if (attDocumensWithErrorsData.entities[id]) {
      dispatch(removeLicenseAttachedDocumentWithErrors(id));
    } else {
      dispatch(removeLicenseAttachedDocument(id));
    }

    handleToggleModal();
  };

  return (
    <LAttDocumentsView
      allAttDocumentsWithErrors={allAttDocumentsWithErrors}
      handleDeleteAttDocument={handleDeleteAttDocument}
      handleCreateAttDocument={handleCreateAttDocument}
      handleEditAttDocument={handleEditAttDocument}
      handleToggleModal={handleToggleModal}
      allAttDocuments={allAttDocuments}
      modalOptions={modalOptions}
      type={type}
    />
  );
};

export default LAttDocumentsContainer;
