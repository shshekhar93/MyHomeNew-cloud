import { useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { useStyletron } from 'styletron-react';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export function DocumentViewer({
  file,
}) {
  const [css] = useStyletron();
  const [numPages, setNumPages] = useState(0);

  const onDocLoaded = useCallback((data) => {
    console.log(data);
    setNumPages(data.numPages)
  }, []);

  return (
    <div className={css({
      display: 'flex',
      justifyContent: 'center',
      maxHeight: 'calc(100% - 97px)', // carousel height
      flex: 1, 
      padding: '0.675rem 0.675rem 0',
      overflow: 'auto',
    })}>
      <Document file={`/file/by-id/${file.id}`} onLoadSuccess={onDocLoaded}>
        {
          (new Array(numPages)).fill().map((_, pageNum) => 
            <Page key={`page_${pageNum + 1}`} pageNumber={pageNum + 1} />
          )
        }
      </Document>
    </div>
  )
};
