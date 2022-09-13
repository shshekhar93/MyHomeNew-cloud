import React, { useEffect } from 'react';
import { STORE_PROPS } from '../../../libs/constants';
import { useStore, useStoreValue } from '../../../libs/store';
import { useQuery } from '../../../libs/utils';
import { FolderContents } from './contents';
import { Shares } from './shares';

function FolderContainer() {
  const store = useStore();
  const curDir = useStoreValue(STORE_PROPS.CUR_DIR);
  const queryPath = useQuery().get('path');

  useEffect(() => {
    store.set(STORE_PROPS.CUR_DIR, queryPath);
  }, [store, queryPath]);

  if(!curDir) {
    return <Shares />;
  }

  return <FolderContents />;
}

export {
  FolderContainer,
};
