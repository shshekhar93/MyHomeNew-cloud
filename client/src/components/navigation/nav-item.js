import React from 'react';
import { useStyletron } from 'styletron-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavItem({
  icon,
  display
}) {
  const [ css ] = useStyletron();

  return (
    <li className={css({
      padding: '10px 15px',
      ':hover': {
        backgroundColor: 'lightgray',
        cursor: 'pointer'
      }
    })}>
      {icon && 
        <FontAwesomeIcon
          icon={icon}
          className={css({
            marginRight: '1rem',
          })} />
      }
      { display }
    </li>
  );
}

export { NavItem };
