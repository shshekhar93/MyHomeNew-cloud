import { useStyletron } from 'styletron-react';

export function Gallery({
  file,
}) {
  const [css] = useStyletron();
  return (
    <div tabIndex="0" className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: 'calc(100% - 97px)', // carousel height
      flex: 1, 
      padding: '0.675rem 0.675rem 0',
    })}>
      {file.category === 'VIDEO' && <VideoPlayer id={file.id} />}
      {file.category === 'IMAGE' && <ImageViewer id={file.id} name={file.name} />}
    </div>
    
  );
};

function ImageViewer({ id, name }) {
  return (
    <img
      src={`/file/by-id/${id}`}
      alt={name}
      style={{
        maxHeight: '100%',
        maxWidth: '100%',
      }} />
  );
}

function VideoPlayer({ id }) {
  return (
    <video
      key={id}
      controls
      style={{
        maxHeight: '100%',
        maxWidth: '100%',
      }}
    >
      <source src={`/file/by-id/${id}`} />
    </video>
  );
}
