import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useStyletron } from 'styletron-react';
import { Input } from '../shared/input';
import { FolderContainer } from './folders-container';
import { useStore, useStoreValue } from '../../libs/store';
import { STORE_PROPS } from '../../libs/constants';
import { useNavigate } from 'react-router-dom';
import { accessibleClickProps } from '../../libs/utils';

function Folders() {
  const [css] = useStyletron();
  const store = useStore();
  const curDir = useStoreValue(STORE_PROPS.CUR_DIR);
  const navigate = useNavigate();

  const parentFolder = useCallback(() => {
    const curFolder = store.get(STORE_PROPS.CUR_DIR);
    const newFolder = (curFolder || '')
      .split('/')
      .filter(Boolean)
      .slice(0, -1)
      .concat('')
      .join('/');
    const fullPath = encodeURIComponent(newFolder);
    
    navigate(`/?path=${fullPath}`);
  }, [store, navigate]);

  // TODO: Limit previous page navigation to dir locations only.
  const previousFolder = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
          tabIndex="0"
          icon={solid('arrow-left')}
          className={css({
            marginRight: '1rem',
            fontSize: '1.5rem',
            cursor: 'pointer',
          })}
          {...accessibleClickProps(previousFolder)} />
        <FontAwesomeIcon
          tabIndex="0"
          icon={solid('arrow-up')}
          className={css({
            marginRight: '1rem',
            fontSize: '1.5rem',
            cursor: 'pointer',
          })}
          {...accessibleClickProps(parentFolder)} />
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
