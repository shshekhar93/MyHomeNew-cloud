import React from 'react';
import { STORE_PROPS } from '../../../libs/constants';
import { useStoreValue } from '../../../libs/store';
import { FolderContents } from './contents';
import { Shares } from './shares';

function FolderContainer() {
  const curDir = useStoreValue(STORE_PROPS.CUR_DIR);

  if(!curDir) {
    return <Shares />;
  }

  return <FolderContents />;
}

export {
  FolderContainer,
};
