import React from 'react';
import { useStyletron } from 'styletron-react';
import { FileIcon } from './file-icon';
import { accessibleClickProps } from '../../../libs/utils';

export const FOLDER_DISPLAY_ROOT_MATCHER = '[data-type="folder-display"]';

function FolderDisplay({
  isFile = false,
  name,
  category,
  contentType,
  select,
}) {
  const [css] = useStyletron();

  return (
    <div
      tabIndex="0"
      className={css({
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        margin: '0.25rem',
        maxWidth: '8rem',
        maxHeight: '8rem',
        overflow: 'hidden',
        wordBreak: 'break-all',
        textAlign: 'center',

        ':focus': {
          outline: '-webkit-focus-ring-color auto 1px',
        },
      })}
      data-type="folder-display"
      data-folder-name={name}
      data-is-file={isFile}
      {...accessibleClickProps(select, true)}
    >
      <div className={css({
        display: 'flex',
        fontSize: '2rem',
      })}>
        <FileIcon category={category} contentType={contentType} />
      </div>
      
      <div>{name}</div>
    </div>
  )
}

export {FolderDisplay};
