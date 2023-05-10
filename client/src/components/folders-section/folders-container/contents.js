import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyletron } from 'styletron-react';
import { useReaddir } from '../../../api/use-readdir';
import { STORE_PROPS } from '../../../libs/constants';
import { useStore } from '../../../libs/store';
import { findParent } from '../../../libs/utils';
import { FolderDisplay, FOLDER_DISPLAY_ROOT_MATCHER } from './display';
import { useFileActions } from '../../../libs/use-file-actions';

function FolderContents() {
  const [css] = useStyletron();
  const store = useStore();
  const navigate = useNavigate();
  const [openFile] = useFileActions();

  const [{
    loading = false,
    error = false,
    result: {
      directories,
      files,
    } = {},
  }] = useReaddir();

  useEffect(() => {
    if(!files && !directories) {
      return;
    }

    document.querySelector('[data-type="folder-display"]').focus();
  }, [files, directories]);

  const onSelect = useCallback((e) => {
    const realTarget = findParent(e.target, FOLDER_DISPLAY_ROOT_MATCHER);
    const name = realTarget.getAttribute('data-folder-name');
    const isFile = realTarget.getAttribute('data-is-file') === 'true';

    if(isFile) {
      const fileIndex = files.findIndex((file) => file.name === name);

      if(fileIndex !== -1) {
        return openFile(files, fileIndex);
      }
    }
    
    const currentFolder = store.get(STORE_PROPS.CUR_DIR);
    const fullPath = encodeURIComponent(`${currentFolder}${name}/`);
    navigate(`/?path=${fullPath}`);
  }, [store, files, openFile, navigate])

  if(loading) {
    return 'Loading';
  }

  if(error || (!files && !directories)) {
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
      {(directories || []).map(({name}) => 
        <FolderDisplay
          key={name}
          isFile={false}
          name={name}
          category="directory"
          select={onSelect} />
      )}
      {(files || []).map(({
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
