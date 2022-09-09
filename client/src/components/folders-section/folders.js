import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useStyletron } from 'styletron-react';
import { Input } from '../shared/input';

function Folders() {
  const [css] = useStyletron();

  return (
    <div>
      <div className={css({
        display: 'flex',
        alignItems: 'center',
      })}>
        <FontAwesomeIcon
          icon={solid('location-dot')}
          className={css({
            marginRight: '1rem',
            fontSize: '1.5rem',
          })} />
        <Input name="current-path" />
      </div>
      Folders
    </div>
  );
}

export { Folders };
