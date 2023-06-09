import { useEffect, useState } from "react";
import { Markdown } from "./components/Markdown/Markdown";
import { Sidebar } from "./components/Sidebar/Sidebar";
import useFileQuery from "src/api/queries/useFileQuery";
import useFilesQuery from "src/api/queries/useFilesQuery";
import { useUpdateFileMutation } from "src/api/mutations/useUpdateFileMutation";

const App = () => {
  const [value, setValue] = useState("");
  const [fileName, setFileName] = useState("");

  const { data: files } = useFilesQuery();

  const { data: file, refetch } = useFileQuery(fileName);

  const { mutate } = useUpdateFileMutation();

  useEffect(() => {
    setFileName(files ? files[0].name : "");
  }, [files]);

  useEffect(() => {
    setValue(file || "");
  }, [file]);

  const handleChangeFileClick = (fileName: string) => {
    setFileName(fileName);
    refetch();
  };

  const handleSaveFileClick = () => {
    mutate(
      { fileName, newFileName: fileName, content: value },
      { onSuccess: () => refetch() }
    );
  };

  return (
    <div className="app-grid">
      <Sidebar
        onNavigationClick={handleChangeFileClick}
        saveFile={handleSaveFileClick}
        currentlyActiveFile={fileName}
      />
      <Markdown value={value} onChange={setValue} />
    </div>
  );
};

export default App;
