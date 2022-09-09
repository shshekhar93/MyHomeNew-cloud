import React from 'react';
import { useStyletron } from 'styletron-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function NavItem({
  icon,
  link,
  display,
}) {
  const [ css ] = useStyletron();

  return (
    <li className={css({
      padding: '10px 15px',
      ':hover': {
        backgroundColor: 'lightgray',
        cursor: 'pointer',
      },
    })}>
      <Link to={link} className={css({
        color: '#000000',
        textDecoration: 'none',

        ':visited': {
          color: '#000000',
        },
      })}>
        {icon && 
        <FontAwesomeIcon
          icon={icon}
          className={css({
            marginRight: '1rem',
          })} />
      }
      { display }
      </Link>
    </li>
  );
}

export { NavItem };
