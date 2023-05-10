import React from 'react';
import { useStyletron } from 'styletron-react';
import { FoldersSection } from './folders-section';
import { Header } from './navigation/header';
import { LeftNav } from './navigation/left-nav';
import { Viewer } from './viewer';

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
        <FoldersSection />
        <Viewer />
      </div>
    </div>
  );
}

export { Root };
