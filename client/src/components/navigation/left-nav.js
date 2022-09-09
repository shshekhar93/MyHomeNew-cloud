import React from 'react';
import { useStyletron } from 'styletron-react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { NavItem } from './nav-item';

function LeftNav() {
  const [css] = useStyletron();
  return (
    <div className={css({
      display: 'flex',
      height: '100%',
      width: '200px',

      '@media only screen and (max-width: 600px)': {
        display: 'none',
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
