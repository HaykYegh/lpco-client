import { type FC, useCallback } from 'react';

import { Button, color, Icon } from '@wf/components';

import type { IFlexableButton } from './FlexableButtonType';
import { ButtonTypes } from './FlexableButtonType';

const FlexableButton: FC<IFlexableButton> = ({ type, handleClick, id }) => {
  const getIconName = (icType: string) => {
    switch (icType) {
      case ButtonTypes.edit:
        return 'ic_edit';
      case ButtonTypes.delete:
        return 'ic_delete';
      case ButtonTypes.update:
        return 'ic_check';
      default:
        return 'ic_close';
    }
  };

  const onClick = useCallback(() => {
    handleClick?.(id);
  }, [handleClick, id]);

  const isUpdateIcon = type === 'check';

  return (
    <Button secondary={!isUpdateIcon} color="success" onClick={onClick} isSquare>
      <Icon name={getIconName(type)} size={17} color={isUpdateIcon ? '#ffffff' : color('typography', 'light')} />
    </Button>
  );
};

export default FlexableButton;
