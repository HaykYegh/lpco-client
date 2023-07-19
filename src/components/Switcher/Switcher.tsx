import type { FC } from 'react';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';
import { Icon, Switcher as WFSwitcher } from '@wf/components';

import type { ISwitcherProps, SwitcherItemType } from './SwitcherTypes';

const Switcher: FC<ISwitcherProps> = ({
  className = '',
  size,
  color,
  label,
  onChange,
  value,
  viewModeValue,
  items,
  disabled,
}) => (
  <WFSwitcher
    onChange={onChange ?? ((option: IdType) => option)}
    viewModeValue={viewModeValue}
    className={className}
    size={size ?? 'md'}
    disabled={disabled}
    color={color}
    label={label}
    value={value}
  >
    {items.map((item: SwitcherItemType) => (
      <WFSwitcher.Item rightIcon={item.rIcon ? <Icon name={item.rIcon} size={20} /> : null} key={item.id} id={item.id}>
        {item.text}
      </WFSwitcher.Item>
    ))}
  </WFSwitcher>
);

export default Switcher;
