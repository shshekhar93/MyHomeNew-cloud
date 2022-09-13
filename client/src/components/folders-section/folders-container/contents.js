import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { useReaddir } from '../../../api/use-readdir';
import { STORE_PROPS } from '../../../libs/constants';
import { useStore } from '../../../libs/store';
import { findParent } from '../../../libs/utils';
import { FolderDisplay, FOLDER_DISPLAY_ROOT_MATCHER } from './display';

function FolderContents() {
  const [css] = useStyletron();
  const store = useStore();
  const navigate = useNavigate();

  const [{
    loading = false,
    error = false,
    result: contents,
  }] = useReaddir();

  const onSelect = useCallback((e) => {
    const realTarget = findParent(e.target, FOLDER_DISPLAY_ROOT_MATCHER);
    const name = realTarget.getAttribute('data-folder-name');
    const isFile = realTarget.getAttribute('data-is-file') === 'true';

    if(isFile) {
      return;
    }
    
    const currentFolder = store.get(STORE_PROPS.CUR_DIR);
    const fullPath = encodeURIComponent(`${currentFolder}${name}/`);
    navigate(`/?path=${fullPath}`);
  }, [store, navigate])

  if(loading) {
    return 'Loading';
  }

  if(error || !contents) {
    return 'Soemthing went wrong';
  }

  return (
    <div className={css({
      display: 'flex',
      flexFlow: 'row wrap',
      // flex: 1,
      padding: '10px 0 0',
      overflowX: 'hidden',
      overflowY: 'auto',
      userSelect: 'none',
    })}>
      {(contents.directories || []).map(({name}) => 
        <FolderDisplay
          key={name}
          isFile={false}
          name={name}
          category="directory"
          select={onSelect} />
      )}
      {(contents.files || []).map(({
        name,
        category,
        contentType,
      }) => 
        <FolderDisplay
          key={name}
          isFile={true}
          name={name}
          category={category}
          contentType={contentType}
          select={onSelect} />
      )}
    </div>
  );
}

export {
  FolderContents,
};
