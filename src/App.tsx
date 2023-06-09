import { useEffect, useState } from "react";
import { Markdown } from "./components/Markdown/Markdown";
import { Sidebar } from "./components/Sidebar/Sidebar";
import useFileQuery from "src/api/queries/useFileQuery";
import useFilesQuery from "src/api/queries/useFilesQuery";

const App = () => {
  const [value, setValue] = useState("");
  const [fileName, setFileName] = useState("");

  const { data: files } = useFilesQuery();

  const { data: file, refetch } = useFileQuery(fileName);

  useEffect(() => {
    setFileName(files ? files[0].name : "");
  }, [files]);

  useEffect(() => {
    setValue(file || "");
  }, [file]);

  const handleClick = (fileName: string) => {
    setFileName(fileName);
    refetch();
  };

  return (
    <div className="app-grid">
      <Sidebar onNavigationClick={handleClick} />
      <Markdown value={value} onChange={setValue} />
    </div>
  );
};

export default App;
