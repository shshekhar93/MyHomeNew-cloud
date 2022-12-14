import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useStyletron } from 'styletron-react';
import { useShares } from '../../../api/use-shares';
import { findParent } from '../../../libs/utils';
import { FolderDisplay, FOLDER_DISPLAY_ROOT_MATCHER } from './display';

function Shares() {
  const [css] = useStyletron();
  const navigate = useNavigate();

  const [{
    loading = false,
    error = false,
    result: shares,
  }] = useShares();

  const selectShare = useCallback((e) => {
    const realTarget = findParent(e.target, FOLDER_DISPLAY_ROOT_MATCHER);
    const name = realTarget.getAttribute('data-folder-name');
    const fullPath = encodeURIComponent(`${name}/`);

    navigate(`/?path=${fullPath}`);
  }, [navigate]);

  if(loading) {
    return 'Loading';
  }

  if(error || !shares) {
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
      {(shares.directories || []).map(({name}) => 
        <FolderDisplay
          key={name}
          isFile={false}
          name={name}
          category="directory"
          select={selectShare} />
      )}
    </div>
  );
}

export {
  Shares,
};
