import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useStyletron } from 'styletron-react';
import { Input } from '../shared/input';
import { FolderContainer } from './folders-container';
import { useStore, useStoreValue } from '../../libs/store';
import { STORE_PROPS } from '../../libs/constants';

function Folders() {
  const [css] = useStyletron();
  const store = useStore();
  const curDir = useStoreValue(STORE_PROPS.CUR_DIR);

  const previousFolder = useCallback(() => {
    const curFolder = store.get(STORE_PROPS.CUR_DIR);
    const newFolder = (curFolder || '')
      .split('/')
      .filter(Boolean)
      .slice(0, -1)
      .concat('')
      .join('/');
    
    store.set(STORE_PROPS.CUR_DIR, newFolder);
  }, [store]);

  return (
    <div className={css({
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    })}>
      <div className={css({
        display: 'flex',
        alignItems: 'center',
      })}>
        <FontAwesomeIcon
          icon={solid('arrow-up')}
          className={css({
            marginRight: '1rem',
            fontSize: '1.5rem',
            cursor: 'pointer',
          })}
          onClick={previousFolder} />
        <label htmlFor="current-path" className={css({
          marginRight: '1rem',
          fontSize: '1.5rem',
          cursor: 'pointer',
        })}>
          <FontAwesomeIcon
          icon={solid('location-dot')} />
        </label>
        <Input
          id="current-path"
          name="current-path"
          value={curDir || 'Network'} />
      </div>
      <FolderContainer />
    </div>
  );
}

export { Folders };
