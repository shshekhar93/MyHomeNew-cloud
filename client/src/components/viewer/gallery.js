import { useStyletron } from 'styletron-react';

export function Gallery({
  file,
}) {
  const [css] = useStyletron();
  return (
    <div className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
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
        maxHeight: 'calc(100vh - 70px)',
        maxWidth: 'calc(100vw - 25px)',
      }} />
  );
}

function VideoPlayer({ id }) {
  return (
    <video controls>
      <source src={`/file/by-id/${id}`} />
    </video>
  );
}
