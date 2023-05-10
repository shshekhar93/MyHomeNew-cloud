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
      position: 'absolute',
      display: isOpen? 'flex': 'none',
      width: '100%',
      top: '72px',
      bottom: 0,
      backgroundColor: 'white',

      '@media only screen and (min-width: 600px)': {
        position: 'static',
        display: 'flex',
        height: '100%',
        width: '200px',
      },
    })}>
      <ul className={css({
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width: '100%',
        borderRight: '1px solid #C4C4C4',
      })}>
        <NavItem
          display="Home"
          link="/"
          icon={solid("house")} />
        <NavItem 
          display="Recent"
          link="/recent"
          icon={solid("rotate")} />
        <NavItem 
          display="Photos"
          link="/category/IMAGE"
          icon={solid("image")} />
        <NavItem 
          display="Music"
          link="/category/AUDIO"
          icon={solid("music")} />
          <NavItem 
            display="Videos"
            link="/category/VIDEO"
            icon={solid("video")} />
        <NavItem 
          display="Documents"
          link="/category/DOCUMENT"
          icon={solid("file-word")} />
        <NavItem
          display="Bookmarks"
          link="/bookmarks"
          icon={solid("star")} />
      </ul>
    </div>
  );
}

export { LeftNav };
