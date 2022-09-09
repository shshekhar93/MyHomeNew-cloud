import React, { useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { NavItem } from './nav-item';
import { useStore } from '../../libs/store';
import { STORE_PROPS } from '../../libs/constants';

function LeftNav() {
  const [css] = useStyletron();
  const [, rerenderer] = useState(0);
  const store = useStore();
  const isOpen = store.get(STORE_PROPS.NAV_OPEN);

  useEffect(() => {
    const handler = () => rerenderer(Date.now());
    store.subscribe(STORE_PROPS.NAV_OPEN, handler);

    return () => store.unsubscribe(STORE_PROPS.NAV_OPEN, handler);
  }, [store]);

  return (
    <div className={css({
      display: 'flex',
      height: '100%',
      width: '200px',

      '@media only screen and (max-width: 600px)': {
        display: isOpen ? 'flex' : 'none',
        width: '100%',
      }
    })}>
      <ul className={css({
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width: '100%',
        borderRight: '1px solid #C4C4C4'
      })}>
        <NavItem display="Home" icon={solid("house")} />
        <NavItem display="Recent" icon={solid("rotate")} />
        <NavItem display="Bookmarks" icon={solid("star")} />
      </ul>
    </div>
  );
}

export { LeftNav };
