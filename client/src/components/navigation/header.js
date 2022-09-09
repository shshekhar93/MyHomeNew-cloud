import React, { useCallback, useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useStore } from '../../libs/store';
import { STORE_PROPS } from '../../libs/constants';

function Header() {
  const [css] = useStyletron();
  const [, rerenderer] = useState(0);
  const store = useStore();
  const isOpen = store.get(STORE_PROPS.NAV_OPEN);

  const toggleLeftNav = useCallback(() => {
    store.set(
      STORE_PROPS.NAV_OPEN, 
      !store.get(STORE_PROPS.NAV_OPEN)
    );
  }, [store]);

  useEffect(() => {
    const handler = () => rerenderer(Date.now());
    store.subscribe(STORE_PROPS.NAV_OPEN, handler);

    return () => store.unsubscribe(STORE_PROPS.NAV_OPEN, handler);
  }, [store]);

  return (
    <div className={css({
      display: 'flex',
      alignItems: 'center',
      width: '100vw',
      minHeight: '72px',
      maxHeight: '72px',
      borderBottom: '1px solid #C4C4C4',
      padding: '10px',
    })}>
      <div className={css({
        display: 'flex',
        alignItems: 'center',
        width: '190px',
      })}>
        <img
          src="/logo192.png"
          alt="Logo"
          className={css({
            maxHeight: '60px',
            marginRight: '0.3rem',
            filter: 'invert(1) drop-shadow(2px 4px 6px #c4c4c4)'
          })} />
        <span className={css({
          fontSize: '1.875rem',
          fontWeight: 'bold',
        })}>Cloud</span>
      </div>
      <div className={css({
        padding: '0 0 0 10px',
        flex: 1,
      })}>
        <input
          name="search-bar"
          placeholder="Search..."
          className={css({
            display: 'block',
            width: '100%',
            padding: '0.375rem 0.75rem',
            lineHeight: 1.5,
            color: '#495057',
            border: '1px solid #ced4da',
            borderRadius: '0.25rem',

            ':focus': {
              borderColor: '#80bdff',
              outline: 0,
              boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
              transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
            }
          })} />
      </div>
      <div className={css({
        display: 'none',
        padding: '0 0 0 10px',
        fontSize: '1.5rem',

        '@media only screen and (max-width: 600px)': {
          display: 'flex',
          alignItems: 'center',
        }
      })}>
        {isOpen?
          <FontAwesomeIcon
            icon={solid('xmark')}
            className={css({
              cursor: 'pointer',
              fontSize: '2rem',
            })}
            onClick={toggleLeftNav} /> :
          <FontAwesomeIcon
            icon={solid('bars')}
            className={css({
              cursor: 'pointer',
            })}
            onClick={toggleLeftNav} />
        }
      </div>
    </div>
  );
}

export { Header };
