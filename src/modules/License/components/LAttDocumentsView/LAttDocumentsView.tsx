import { type FC, useMemo, useState } from 'react';

import type { EntityId } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { Alert } from '@wf/components';

import LAttDocumentPopupContent from '../../containers/LAttDocumentsContainer/LAttDocumentPopupContent';
import type { ILAttDocumentsViewProps, ILAttDocumentsViewTHeaderItem } from './LAttDocumentsViewType';
import TabContentSection from '../../../../components/TabContentSection';
import { HeaderItems } from '../../../../components/Header/HeaderTypes';
import LAttDocumentsBodyView from './LAttDocumentsBodyView';
import Header from '../../../../components/Header';
import Table from '../../../../components/Table';
import Modal from '../../../../components/Modal';

import { LicenseModeItems } from '../../store/types';

import { licenseSubDocsAttDocumentsSelector } from '../../store/selectors';

import styles from './LAttDocumentsView.module.scss';

const tableHeaders: Array<ILAttDocumentsViewTHeaderItem> = [
  { name: '#', flex: 1 },
  { name: 'Code', flex: 2 },
  { name: 'Type', flex: 3 },
  { name: 'Ref. Number', flex: 2 },
  { name: 'Date', flex: 2 },
  { name: '', flex: 1 },
];

const LAttDocumentsView: FC<ILAttDocumentsViewProps> = ({
  allAttDocuments,
  allAttDocumentsWithErrors,
  handleEditAttDocument,
  handleDeleteAttDocument,
  type,
  handleCreateAttDocument,
  handleToggleModal,
  modalOptions,
}) => {
  const [close, setClose] = useState(true);
  const viewMode = type === LicenseModeItems.view;

  const attDocumentsWithErrorsLength = allAttDocumentsWithErrors.length;
  const attDocumentsLength = allAttDocuments.length;
  const allAttDocumentsLength = attDocumentsWithErrorsLength + attDocumentsLength;

  const subDocsAttDocuments = useSelector(licenseSubDocsAttDocumentsSelector);

  const handleClose = () => {
    setClose(!close);
  };

  const headerActions = useMemo(
    () => [
      {
        field: HeaderItems.button,
        text: 'Add New Attachment',
        color: 'success' as ColorType,
        name: 'add',
        leftIcon: 'ic_add',
        handleSubmit: handleCreateAttDocument,
      },
    ],
    [handleCreateAttDocument]
  );

  return (
    <TabContentSection>
      <Header
        actions={!viewMode && subDocsAttDocuments.add ? headerActions : null}
        title={<h2>List of Attached Documents</h2>}
        className={styles.header_content}
      />
      {!!attDocumentsWithErrorsLength && close && (
        <Alert type="error" onClose={handleClose}>
          {`We have errors in ${attDocumentsWithErrorsLength} items`}
        </Alert>
      )}
      <Table
        emptyDataText="This is place holder text. The basic dialog for tables"
        emptyDataTitle="There is no attached documents added"
        dataCount={allAttDocumentsLength}
        tableHeaders={tableHeaders}
      >
        <LAttDocumentsBodyView
          handleEditAttDocument={handleEditAttDocument}
          attAttDocuments={allAttDocumentsWithErrors}
          subDocsAttDocuments={subDocsAttDocuments}
          handleToggleModal={handleToggleModal}
          currIndex={attDocumentsLength}
          hasError={true}
          type={type}
        />
        <LAttDocumentsBodyView
          handleEditAttDocument={handleEditAttDocument}
          subDocsAttDocuments={subDocsAttDocuments}
          handleToggleModal={handleToggleModal}
          attAttDocuments={allAttDocuments}
          currIndex={0}
          type={type}
        />
      </Table>
      <LAttDocumentPopupContent />
      <Modal
        handleLeftButtonClick={() => handleDeleteAttDocument(modalOptions.id as EntityId)}
        handleClosePopup={handleToggleModal}
        title="Delete attached document"
        isOpen={modalOptions.isOpen}
        rightButtonColor="success"
        rightButtonText="Cancel"
        leftButtonColor="error"
        leftButtonText="Delete"
      >
        Are you sure you want to delete Attached Document ?
      </Modal>
    </TabContentSection>
  );
};

export default LAttDocumentsView;
