import { useCallback } from 'react';

import type { FC } from 'react';

import { Button, Modal as WFModal } from '@wf/components';

import type { IModalComponentProps } from './ModalTypes';

const Modal: FC<IModalComponentProps> = ({
  children,
  title,
  id = 1,
  isOpen,
  leftButtonColor,
  leftButtonText,
  handleLeftButtonClick,
  modalId,
  rightButtonColor,
  rightButtonText,
  handleClosePopup,
}) => {
  const leftButtonClick = useCallback(() => {
    handleLeftButtonClick?.(modalId);
  }, [handleLeftButtonClick, modalId]);

  return (
    <WFModal isOpen={isOpen} handleClose={handleClosePopup} id={`modal${id}`}>
      <WFModal.Header>
        <WFModal.Title>{title}</WFModal.Title>
      </WFModal.Header>
      <WFModal.Content>{children}</WFModal.Content>
      <WFModal.Footer>
        <Button onClick={leftButtonClick} color={leftButtonColor}>
          {leftButtonText}
        </Button>
        <Button onClick={handleClosePopup} color={rightButtonColor} secondary>
          {rightButtonText}
        </Button>
      </WFModal.Footer>
    </WFModal>
  );
};

export default Modal;
