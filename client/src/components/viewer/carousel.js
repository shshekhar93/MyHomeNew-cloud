import { useStyletron } from "styletron-react"
import { FileIcon } from "../folders-section/folders-container/file-icon";

export function Carousel({
  files,
  selectedId,
}) {
  const [css] = useStyletron();

  return (
    <div tabIndex="0" className={css({
      display: 'flex',
      justifyContent: 'center',
      padding: '0.675rem',
    })}>
      {
        files.map(({
          id,
          category,
          contentType,
        }, idx) =>
          <div className={css({
            marginRight: '1rem',
            width: '120px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            outline: selectedId === idx ? '-webkit-focus-ring-color auto 1px' : 'undefined',
          })}>
            <FileIcon
              id={id}
              category={category}
              contentType={contentType}
              maxHeight={75}
              selected={selectedId === idx} />
          </div>
        )
      }
    </div>
  )
};
