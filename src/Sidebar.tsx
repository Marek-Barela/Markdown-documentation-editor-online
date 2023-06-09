import useFilesList from "./api/queries/useFilesListQuery";
import { File } from "./types/file";

export const Sidebar = () => {
  const { data } = useFilesList();

  return (
    <>
      <nav className="sidebar">
        <ul>
          {data?.map((file: File) => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      </nav>
      <div></div>
    </>
  );
};
