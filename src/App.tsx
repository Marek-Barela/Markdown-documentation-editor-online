import { useEffect, useState } from "react";
import { Markdown } from "./components/Markdown/Markdown";
import { Sidebar } from "./components/Sidebar/Sidebar";
import useFileQuery from "src/api/queries/useFileQuery";
import useFilesQuery from "src/api/queries/useFilesQuery";

const App = () => {
  const [value, setValue] = useState("");

  const { data: files } = useFilesQuery();
  const { data: file } = useFileQuery(files ? files[2].name : "");

  useEffect(() => {
    setValue(file || "");
  }, [file]);

  return (
    <div className="app-grid">
      <Sidebar />
      <Markdown value={value} onChange={setValue} />
    </div>
  );
};

export default App;
