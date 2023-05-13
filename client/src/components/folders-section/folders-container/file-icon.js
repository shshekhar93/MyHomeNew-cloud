import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useStyletron } from 'styletron-react';

const DIRECTORY_ICON = solid('folder');

const TYPE_ICON_MAP = {
  'application/pdf': solid('file-pdf'),
  'application/msword': solid('file-word'),
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': solid('file-word'),
  'application/vnd.oasis.opendocument.text': solid('file-word'),
  'application/rtf': solid('file-word'),
  'application/vnd.ms-excel': solid('file-excel'),
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': solid('file-excel'),
  'application/vnd.oasis.opendocument.spreadsheet': solid('file-excel'),
  'application/vnd.ms-powerpoint': solid('file-powerpoint'),
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': solid('file-powerpoint'),
  'application/vnd.oasis.opendocument.presentation': solid('file-powerpoint'),
};
const CATEGORY_ICON_MAP = {
  IMAGE: solid('image'),
  AUDIO: solid('headphones'),
  VIDEO: solid('video'),
  DOCUMENT: solid('file-lines'),
  UNKNOWN: solid('file'),
}
const THUMBNAIL_ENABLED_CATEGORIES = [
  'IMAGE',
];

const ICON_OVER_THUMBS_STYLE = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  background: 'white',
  padding: '1px 3px',
  borderTopLeftRadius: '3px',
  borderTopRightRadius: '3px',
  borderBottomLeftRadius: '3px',
  fontSize: '1rem',
};

const mapper = (category, type) => {
  if(category === 'directory') {
    return DIRECTORY_ICON;
  }

  return (
    TYPE_ICON_MAP[type]
      || CATEGORY_ICON_MAP[category]
      || CATEGORY_ICON_MAP.UNKNOWN
  );
};

function FileIcon({ id, category, contentType, maxHeight = 40, selected }) {
  const [css] = useStyletron();
  const icon = useMemo(
    () => mapper(category, contentType),
    [category, contentType]
  );

  const displayThumbnail = THUMBNAIL_ENABLED_CATEGORIES.includes(category);
  
  return (
    <div className={css({
      position: 'relative',
      transform: selected ? 'scale(0.9)' : undefined,
    })}>
      {displayThumbnail && 
        <img
          alt=""
          src={`/thumbnail/by-id/${id}`}
          className={css({
            maxHeight: `${maxHeight}px`,
          })} />
      }
      <FontAwesomeIcon icon={icon} className={css(displayThumbnail ? ICON_OVER_THUMBS_STYLE : {})} />
    </div>
  );
}

export { FileIcon };
