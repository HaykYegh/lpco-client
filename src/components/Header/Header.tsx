import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { FC } from 'react';

import { Button, Header as WFHeader, HeaderNavigation, Icon, InputGroup } from '@wf/components';

import type { IHeader } from './HeaderTypes';
import { HeaderItems } from './HeaderTypes';

import styles from './Header.module.scss';

const Header: FC<IHeader> = ({ title, link, actions, groupActions, rightContent, className }) => (
  <WFHeader className={classNames(styles.header_container, className)}>
    <HeaderNavigation.Title>
      {link ? (
        <Link to={link}>
          <HeaderNavigation.Button>
            <Icon name="ic_arrow_left" size={14} />
          </HeaderNavigation.Button>
          {title}
        </Link>
      ) : (
        title
      )}
    </HeaderNavigation.Title>
    {(actions || groupActions) && (
      <HeaderNavigation.Actions>
        {actions?.map(
          ({ text, name, leftIcon, field, link, handleSubmit, ...rest }) =>
            field === HeaderItems.button &&
            (link ? (
              <Link key={name} to={link}>
                <Button {...rest} leftIcon={leftIcon ? <Icon name={leftIcon} /> : null}>
                  {text}
                </Button>
              </Link>
            ) : (
              <Button
                leftIcon={leftIcon ? <Icon name={leftIcon} /> : null}
                onClick={() => handleSubmit?.(name)}
                key={name}
                {...rest}
              >
                {text}
              </Button>
            ))
        )}
        {groupActions && (
          <InputGroup>
            {groupActions.map(({ text, leftIcon, name, handleSubmit, ...rest }) => (
              <InputGroup.Button
                leftIcon={leftIcon ? <Icon name={leftIcon} {...rest} /> : null}
                onClick={() => handleSubmit?.(name)}
                key={name}
              >
                {text}
              </InputGroup.Button>
            ))}
          </InputGroup>
        )}
      </HeaderNavigation.Actions>
    )}
    {!!rightContent && <HeaderNavigation.Actions>{rightContent}</HeaderNavigation.Actions>}
  </WFHeader>
);

export default Header;
