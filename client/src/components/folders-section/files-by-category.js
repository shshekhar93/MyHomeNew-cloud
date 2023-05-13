import { useParams } from "react-router-dom";
import { useFilesByCategory } from "../../api/use-files-by-category";
import { useStyletron } from "styletron-react";
import { FolderDisplay } from "./folders-container/display";
import { useFileActions } from "../../libs/use-file-actions";

export function FilesByCategory() {
  let { category } = useParams();
  const [css] = useStyletron();
  const [openFile] = useFileActions();
  const [{
    loading = false,
    error = false,
    result = [],
  }] = useFilesByCategory(category);

  if(loading) {
    return 'Loading';
  }

  if(error || !result) {
    return 'Soemthing went wrong';
  }

  return (
    <div className={css({
      display: 'flex',
      flexFlow: 'row wrap',
      // flex: 1,
      padding: '10px 0 0',
      overflowX: 'hidden',
      overflowY: 'auto',
      userSelect: 'none',
    })}>
      {result.map(({
        id,
        name,
        category,
        contentType,
      }, index) => 
        <FolderDisplay
          key={name}
          isFile={true}
          name={name}
          id={id}
          category={category}
          contentType={contentType}
          select={() => openFile(result, index)} />
      )}
    </div>
  )
};
