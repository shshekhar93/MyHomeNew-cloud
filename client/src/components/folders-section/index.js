import { Route, Routes } from "react-router-dom";
import { useStyletron } from "styletron-react";
import { Bookmarks } from "./bookmarks";
import { Folders } from "./folders";
import { RecentFiles } from "./recent-files";

function FoldersSection() {
  const [css] = useStyletron();

  return (
    <div className={css({
      flex: 1,
      padding: '10px',
    })}>
      <Routes>
        <Route path="/" element={<Folders />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/recent" element={<RecentFiles />} />
      </Routes>
    </div>
  )
}

export {
  FoldersSection,
};
