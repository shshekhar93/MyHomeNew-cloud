import { Route, Routes } from "react-router-dom";
import { useStyletron } from "styletron-react";
import { Bookmarks } from "./bookmarks";
import { Folders } from "./folders";
import { RecentFiles } from "./recent-files";
import { FilesByCategory } from "./files-by-category";

function FoldersSection() {
  const [css] = useStyletron();

  return (
    <div className={css({
      flex: 1,
      padding: '10px',
      overflow: 'auto',
    })}>
      <Routes>
        <Route path="/" element={<Folders />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/recent" element={<RecentFiles />} />
        <Route path="/category/:category" element={<FilesByCategory />} />
      </Routes>
    </div>
  )
}

export {
  FoldersSection,
};
