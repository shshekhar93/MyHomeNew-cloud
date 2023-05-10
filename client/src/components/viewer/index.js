import { useSelectedFile } from "../../libs/use-file-actions";
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
  const file = files?.[idx];
  
  // No file open
  if(!file) {
    return;
  }
  
  const Component = getComponentForFile(file);

  return (
    <ViewerWrapper title={file?.name} onClose={close}>
      <Component file={file} />
    </ViewerWrapper>
  )
}
