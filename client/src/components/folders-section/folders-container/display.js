import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useStyletron } from 'styletron-react';

export const FOLDER_DISPLAY_ROOT_MATCHER = '[data-type="folder-display"]';

function FolderDisplay({
  isFile = false,
  name,
  select,
}) {
  const [css] = useStyletron();

  return (
    <div
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
      })}
      data-type="folder-display"
      data-folder-name={name}
      data-is-file={isFile}
      onDoubleClick={select}
    >
      <div className={css({
        display: 'flex',
        fontSize: '2rem',
      })}>
        {isFile?
          <FontAwesomeIcon icon={solid('file')} />:
          <FontAwesomeIcon icon={solid('folder')} />
        }
      </div>
      
      <div>{name}</div>
    </div>
  )
}

export {FolderDisplay};
