import { type FC, type MouseEventHandler, useEffect } from 'react';

import { Controller, type FieldValues, type SubmitHandler, type UseFormReturn, useWatch } from 'react-hook-form';

import { Button, DatePicker, FileUpload, Input, Select } from '@wf/components';

import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import type { ILAttDocumentPopupViewProps } from './LAttDocumentPopupContentViewType';
import LItemPopupContentViewTexts from './LAttDocumentPopupContentViewTexts';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';
import Popup from '../../../../../components/Popup';
import Label from '../../../../../components/Label';

import { attDocUploadSupportedFileTypes, attDocUploadSupportedMaxFileSize } from '../../../constants';
import { ChangeMethods } from '../../../store/types';

import styles from './LAttDocumentPopupContentView.module.scss';

const LAttDocumentPopupContentView: FC<ILAttDocumentPopupViewProps> = ({
  form,
  itemChangeMethod,
  showPopup,
  title,
  handleCreateAttDocument,
  handleUpdateAttDocument,
  handleClosePopup,
  attachmentsState,
  handleAttachmentChange,
  singleInputRef,
  handleFileChange,
  handleFileDrop,
  handleChooseFile,
  handleDeleteFile,
  fileUploadError,
  mandatoryFields,
  editableFields,
}) => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = form as UseFormReturn;

  const handleSendData =
    itemChangeMethod === ChangeMethods.EDIT
      ? (handleUpdateAttDocument as SubmitHandler<FieldValues>)
      : (handleCreateAttDocument as SubmitHandler<FieldValues>);
  const sendButtonText =
    itemChangeMethod === ChangeMethods.EDIT
      ? LItemPopupContentViewTexts.OPERATION_UPDATE_BUTTON_TEXT
      : LItemPopupContentViewTexts.OPERATION_ADD_BUTTON_TEXT;

  const attachment: OptionsItemType = useWatch({ name: 'code' });
  const attachmentValue: string = attachment?.value;

  const mandatoryEntities = mandatoryFields?.entities;
  const editableEntities = editableFields?.entities;

  useEffect(() => {
    handleAttachmentChange(attachmentValue);
  }, [attachmentValue, handleAttachmentChange]);

  return (
    <Popup title={title} showPopup={showPopup} handleClosePopup={handleClosePopup}>
      <div className={styles.content}>
        <div className={styles.content_body}>
          <SectionBody>
            <SectionRow>
              <Controller
                render={({ field }) => (
                  <Select
                    options={createOptionsArrayFromData(attachmentsState, 'code', 'code', 'description')}
                    label={<Label mandatory={!!mandatoryEntities?.code}>Code</Label>}
                    errorMessage={errors?.code?.message as string}
                    placeholder="Search attachment code"
                    isClearable
                    {...field}
                    disabled={!editableEntities?.code}
                  />
                )}
                control={control}
                name="code"
              />
            </SectionRow>
            <SectionRow>
              <Input
                label={<Label mandatory={!!mandatoryEntities?.referenceNumber}>Reference Number</Label>}
                errorMessage={errors?.referenceNumber?.message as string}
                disabled={!editableEntities?.referenceNumber}
                placeholder="Write reference name"
                {...register('referenceNumber')}
              />
            </SectionRow>
            <hr />
            <SectionRow>
              <Controller
                render={({ field }) => (
                  <DatePicker
                    label={<Label mandatory={!!mandatoryEntities?.attachmentDate}>Date</Label>}
                    errorMessage={errors?.attachmentDate?.message as string}
                    disabled={!editableEntities?.attachmentDate}
                    className={styles.date_picker}
                    placeholderText="Date"
                    {...field}
                    ref={(ref) => {
                      field.ref({
                        focus: ref?.setFocus,
                      });
                    }}
                  />
                )}
                name="attachmentDate"
                control={control}
              />
            </SectionRow>
            <div className={styles.upload_content}>
              <input
                disabled={!editableEntities?.fileUrl}
                onChange={handleFileChange}
                id="input-file-upload"
                ref={singleInputRef}
                type="file"
              />
              <Label mandatory={!!mandatoryEntities?.fileUrl}>Upload File</Label>
              <FileUpload
                supportedMaxFileSize={attDocUploadSupportedMaxFileSize}
                supportedFileTypes={attDocUploadSupportedFileTypes}
                onChooseFile={handleChooseFile}
                fileName={watch('fileUrl')}
                onDelete={handleDeleteFile}
                onDrop={handleFileDrop}
              />
            </div>
          </SectionBody>
        </div>
        <div className={styles.content_footer}>
          <Button color="success" onClick={handleSubmit(handleSendData, fileUploadError) as MouseEventHandler}>
            {sendButtonText}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default LAttDocumentPopupContentView;
