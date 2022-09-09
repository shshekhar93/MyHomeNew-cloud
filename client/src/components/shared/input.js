import React from 'react';
import { useStyletron } from 'styletron-react';

function Input(props = {}) {
  const [css] = useStyletron();
  
  return (
    <input
      className={css({
        display: 'block',
        width: '100%',
        padding: '0.375rem 0.75rem',
        lineHeight: 1.5,
        color: '#495057',
        border: '1px solid #ced4da',
        borderRadius: '0.25rem',

        ':focus': {
          borderColor: '#80bdff',
          outline: 0,
          boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
          transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
        },
      })}
      {...props} />
  );
}

export { Input };
