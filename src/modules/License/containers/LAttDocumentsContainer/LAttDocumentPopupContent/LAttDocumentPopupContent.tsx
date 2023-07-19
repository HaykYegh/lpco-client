import { type FC, useCallback, useEffect, useRef, useState } from 'react';

import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import type { EntityId } from '@reduxjs/toolkit';
import * as yup from 'yup';

import { toasterEmitter } from '@wf/components';

import LAttDocumentPopupContentView from '../../../components/LAttDocumentsView/LAttDocumentPopupContentView';
import { attDocumentValidation } from '../../../validationObjects/attDocumentValidation';
import { popupConfigsDataSelector } from '../../../../../store/popupConfigs/selectors';
import { getSchemaObject, type IFields } from '../../../../../helpers/getSchemaObject';
import { attachmentsAdapter } from '../../../../../store/attachments/entityAdapters';
import { attDocumentInfoDefaultValues } from './attDocumentInfoDefaultValues';
import { removePopupConfig } from '../../../../../store/popupConfigs/slices';
import type { IAttDocumentFormData } from './LAttDocumentPopupContentTypes';
import { PopupNames } from '../../../../../store/popupConfigs/types';
import { getFormatDate } from '../../../../../helpers/getFormatDate';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';

import { ChangeMethods } from '../../../store/types';
import { attDocumentFile } from '../../../constants';

import {
  licenseAttDocumentEditableFieldsSelector,
  licenseAttDocumentMandatoryFieldsSelector,
  licenseAttDocumentsSelector,
} from '../../../store/selectors';
import {
  addLicenseAttachedDocument,
  removeLicenseAttachedDocumentWithErrors,
  updateLicenseAttachedDocument,
} from '../../../store/slices';
import { attachmentsSelector } from '../../../../../store/attachments/selectors';
import { getAttachmentsApi } from '../../../../../store/attachments/actions';
import { uploadsDataSelector } from '../../../../../store/uploads/selectors';
import { getUploadParams } from '../../../../../store/uploads/actions';
import * as slicesActions from '../../../../../store/uploads/slices';

const LAttDocumentPopupContent: FC = () => {
  const [validObject, setValidObject] = useState({});
  const attDocumentValidationSchema = yup.object(validObject);
  const { type } = useTypeInPath();
  const form = useForm({
    resolver: yupResolver(attDocumentValidationSchema),
    defaultValues: attDocumentInfoDefaultValues,
    mode: 'onChange',
  }) as unknown as UseFormReturn;

  const { reset, setValue, watch, trigger } = form;

  const dispatch = useDispatch();

  const attachmentsAdapterSelectors = attachmentsAdapter.getSelectors();
  const attachmentsData = useSelector(attachmentsSelector);
  const attachmentsState = attachmentsAdapterSelectors.selectAll(attachmentsData);
  const attachmentsLength = attachmentsData.ids.length;

  const popupConfigsData = useSelector(popupConfigsDataSelector);
  const popupInfo = popupConfigsData.entities[PopupNames.ATT_DOCUMENTS];
  const attDocumentId = popupInfo?.data?.id;

  const singleInputRef = useRef<HTMLInputElement>(null);
  const uploadsDataState = useSelector(uploadsDataSelector);
  const fileInfo = uploadsDataState.entities?.[attDocumentFile]?.uploadedFileInfo ?? null;
  const fileUrl = fileInfo?.fileUrl ?? '';

  const attachmentCodeWatch: OptionsItemType = watch('code');
  const attachmentCode: string = attachmentCodeWatch?.value;
  const attachmentItem = attachmentsAdapterSelectors.selectById(attachmentsData, attachmentCode);

  const mandatoryFields = useSelector(licenseAttDocumentMandatoryFieldsSelector);
  const editableFields = useSelector(licenseAttDocumentEditableFieldsSelector);

  const attDocumentsData = useSelector(licenseAttDocumentsSelector);

  useEffect(() => {
    setValue('fileUrl', fileUrl);
  }, [fileUrl, setValue]);

  const getSendingData = (data: IAttDocumentFormData) => ({
    code: data.code?.value,
    description: data.code?.tag?.label,
    name: data.name,
    referenceNumber: data.referenceNumber,
    attachmentDate: data.attachmentDate ? getFormatDate(data.attachmentDate, 'YYYY-MM-DD') : null,
    fileUrl: data.fileUrl,
  });

  const handleClosePopup = useCallback(() => {
    toEmptySingleInputRef();
    dispatch(removePopupConfig(PopupNames.ATT_DOCUMENTS));
    reset({ ...attDocumentInfoDefaultValues });
  }, [dispatch, reset]);

  const handleCreateAttDocument = useCallback(
    (data: IAttDocumentFormData) => {
      dispatch(
        addLicenseAttachedDocument({
          ...getSendingData(data),
          id: Date.now(),
        })
      );
      handleClosePopup();
    },
    [dispatch, handleClosePopup]
  );

  const handleUpdateAttDocument = (data: IAttDocumentFormData) => {
    if (attDocumentsData.entities[attDocumentId]) {
      dispatch(
        updateLicenseAttachedDocument({
          id: attDocumentId,
          changes: getSendingData(data),
        })
      );
    } else {
      dispatch(removeLicenseAttachedDocumentWithErrors(attDocumentId as EntityId));
      dispatch(
        addLicenseAttachedDocument({
          ...getSendingData(data),
          id: attDocumentId,
        })
      );
    }

    handleClosePopup();
  };

  const toEmptySingleInputRef = () => {
    if (singleInputRef?.current?.value) {
      singleInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (!attachmentsLength) {
      dispatch(getAttachmentsApi({ attDocumentCodeValue: '' }));
    }
  }, [dispatch, attachmentsLength]);

  useEffect(() => {
    if (attDocumentId) {
      const code = popupInfo.data.code;
      reset({
        ...popupInfo.data,
        code: code
          ? {
              label: code,
              value: code,
            }
          : null,
      });
    }
  }, [attDocumentId, popupInfo, reset]);

  useEffect(() => {
    const schemaObject = getSchemaObject(mandatoryFields as IFields, attDocumentValidation, editableFields as IFields);
    setValidObject(schemaObject);
  }, [mandatoryFields]);

  useEffect(() => {
    if (attDocumentId) {
      void trigger();
    }
  }, [attDocumentId, trigger]);

  const handleAttachmentChange = useCallback(
    (attachmentValue: string) => {
      if (attachmentItem || !attachmentValue) {
        setValue('name', attachmentItem?.description);
      }
    },
    [attachmentItem, setValue]
  );

  const handleChooseFile = useCallback(() => {
    singleInputRef?.current?.click();
  }, []);

  const uploadFile = useCallback(
    (files: FileList | null) => {
      if (files?.[0]) {
        const formData = new FormData();
        formData.append('file', files[0]);
        dispatch(getUploadParams({ url: 'attDoc', fieldName: attDocumentFile, formData }));
      }
    },
    [dispatch]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      uploadFile(e.target.files);
    },
    [uploadFile]
  );

  const handleDeleteFile = useCallback(() => {
    dispatch(slicesActions.removeUpload(attDocumentFile));
    setValue('fileUrl', '');
    toEmptySingleInputRef();
  }, [dispatch, setValue]);

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      uploadFile(e.dataTransfer.files);
    },
    [uploadFile]
  );

  const fileUploadError = useCallback((errorsData: Record<string, any>) => {
    if (errorsData?.fileUrl?.message) {
      toasterEmitter({
        title: 'Error Message',
        status: 'error',
        description: 'Choosing file is mandatory',
      });
    }
  }, []);

  return (
    <FormProvider {...form}>
      <LAttDocumentPopupContentView
        title={attDocumentId ? 'Edit Attached Document' : 'Add New Attached Document'}
        itemChangeMethod={attDocumentId ? ChangeMethods.EDIT : ChangeMethods.ADD}
        handleCreateAttDocument={handleCreateAttDocument}
        handleUpdateAttDocument={handleUpdateAttDocument}
        handleAttachmentChange={handleAttachmentChange}
        handleClosePopup={handleClosePopup}
        attachmentsState={attachmentsState}
        handleFileChange={handleFileChange}
        handleChooseFile={handleChooseFile}
        handleDeleteFile={handleDeleteFile}
        fileUploadError={fileUploadError}
        mandatoryFields={mandatoryFields}
        singleInputRef={singleInputRef}
        handleFileDrop={handleFileDrop}
        editableFields={editableFields}
        showPopup={!!popupInfo}
        type={type}
        form={form}
      />
    </FormProvider>
  );
};

export default LAttDocumentPopupContent;
