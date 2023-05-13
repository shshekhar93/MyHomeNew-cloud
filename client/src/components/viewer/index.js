import { useFileActions, useSelectedFile } from "../../libs/use-file-actions";
import { Carousel } from "./carousel";
import { Gallery } from "./gallery";
import { ViewerWrapper } from './wrapper';

const MissingViewer = ({ name }) => {
  return (
    <div>
      Unable to open file {name}, no appropriate handler.
    </div>
  )
}

const getComponentForFile = ({ category }) => {
  switch(category) {
    case 'IMAGE':
    case 'VIDEO':
      return Gallery;
    default:
      return MissingViewer;
  }
}

export function Viewer() {
  const [files, idx, close] = useSelectedFile();
  const [openFile] = useFileActions();
  const file = files?.[idx];

  const nextFile = () => {
    if(!files.length) {
      return;
    }

    openFile(files, (idx + 1) % files.length);
  };

  const prevFile = () => {
    if(!files.length) {
      return;
    }

    openFile(files, (idx - 1 + files.length) % files.length);
  }
  
  // No file open
  if(!file) {
    return;
  }
  
  const Component = getComponentForFile(file);

  return (
    <ViewerWrapper
      title={file?.name}
      onClose={close}
      onNext={nextFile}
      onPrev={prevFile}
    >
      <Component file={file} />
      <Carousel files={files} selectedId={idx} />
    </ViewerWrapper>
  )
}
