import { useStyletron } from "styletron-react";
import FocusTrap from 'focus-trap-react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { accessibleClickProps } from "../../libs/utils";
import { useCallback } from "react";

export function ViewerWrapper({
  title,
  onClose,
  onNext,
  onPrev,
  children,
}) {
  const [css] = useStyletron();

  const onKeyUp = useCallback(e => {
    switch(e.code) {
      case 'ArrowRight':
        return onNext();
      case 'ArrowLeft': 
        return onPrev();
    }
  }, [onNext, onPrev])

  return (
    <FocusTrap>
      <div className={css({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display:'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      })} onKeyUp={onKeyUp}>
        <header className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.675rem',
          backgroundColor: '#E1E6E5',
          boxShadow: '0 -1px 5px #919695',
        })}>
          <span>{title}</span>
          <span
            tabIndex="0"
            className={css({
              width: '1.5rem',
              height: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.375rem',
              padding: '0.375rem',
              cursor: 'pointer',
            })}
            {...accessibleClickProps(onClose)}
          >
            <FontAwesomeIcon icon={solid('xmark')} />
          </span>
        </header>
        <content className={css({
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          maxHeight: 'calc(100vh - 46px)',
        })}>
          {children}
        </content>
      </div>
    </FocusTrap>
    
  );
};
