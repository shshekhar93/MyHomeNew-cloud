import React from 'react';
import { useStyletron } from 'styletron-react';
import { Header } from './navigation/header';
import { LeftNav } from './navigation/left-nav';

function Root() {
  const [css] = useStyletron();
  return (
    <div className={css({
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    })}>
      <Header />
      <div className={css({
        display: 'flex',
        height: 'calc(100vh - 72px)',
      })}>
        <LeftNav />
        <div></div>
      </div>
    </div>
  );
}

export { Root };
