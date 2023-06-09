import useFilesQuery from "src/api/queries/useFilesQuery";
import { ReactComponent as Document } from "src/components/SVG/Document.svg";
import { ReactComponent as AddDocument } from "src/components/SVG/AddDocument.svg";
import { ReactComponent as SaveDocument } from "src/components/SVG/SaveDocument.svg";
import { ReactComponent as EditIcon } from "src/components/SVG/EditIcon.svg";
import { File } from "src/types/file";
import { useCreateFileMutation } from "src/api/mutations/useCreateFileMutation";
import { useUpdateFileNameMutation } from "src/api/mutations/useUpdateFileNameMutation";
import { useState } from "react";

interface SidebarProps {
  onNavigationClick: (fileName: string) => void;
  saveFile: () => void;
  currentlyActiveFile: string;
}

export const Sidebar = ({
  onNavigationClick,
  saveFile,
  currentlyActiveFile,
}: SidebarProps) => {
  const { data, refetch } = useFilesQuery();
  const { mutate } = useCreateFileMutation();
  const { mutate: updateFileName } = useUpdateFileNameMutation();
  const [hoveredElement, setHoveredElement] = useState<null | string>(null);

  const handleCreateNewFileClick = () => {
    mutate(
      { fileName: "Untitled.md" },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleMouseEnter = (id: string) => {
    setHoveredElement(id);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const handleEditFileNameClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    const name = prompt("Enter new file name");

    if (name) {
      updateFileName(
        { fileName: fileName, newFileName: name },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  return (
    <>
      <aside className="w-[300px] bg-[#242424] min-h-full h-screen flex flex-col items-center pt-5 pb-2 space-y-7 fixed">
        <div className="w-full flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
          <div className="font-QuicksandMedium m-3 mx-4 flex gap-2 justify-between">
            <button
              className="flex p-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 h-11 flex-shrink-0 flex-grow"
              title="Create new file"
              onClick={handleCreateNewFileClick}>
              <AddDocument width={16} /> New file
            </button>
            <button
              className="flex p-3 gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 h-11 w-11 flex-shrink-0 items-center justify-center"
              title="Save file"
              onClick={saveFile}>
              <SaveDocument width={24} />
            </button>
          </div>
          <div className="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase">
            Menu
          </div>
          {data?.map((file: File) => (
            <div
              key={file.id}
              className="w-full flex items-center gap-x-1.5 group select-none cursor-pointer"
              onClick={() => onNavigationClick(file.name)}
              onMouseEnter={() => handleMouseEnter(file.id)}
              onMouseLeave={handleMouseLeave}>
              <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 w-full h-[102%] ${
                    currentlyActiveFile === file.name ? "" : "translate-y-full"
                  } group-hover:translate-y-0 bg-red-600 transition-all duration-300`}></div>
              </div>
              <div
                className={`${
                  currentlyActiveFile === file.name ? "bg-white/10 text-white" : ""
                } group-hover:bg-white/10 w-full group-active:scale-95 self-stretch px-2 rounded flex items-center justify-between space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm`}>
                <div className="flex justify-center items-center gap-3">
                  <Document width={24} />
                  <span className="font-QuicksandMedium">{file.name}</span>
                </div>
                <button
                  className={`${hoveredElement === file.id ? "" : "hidden"} p-2`}
                  onClick={e => handleEditFileNameClick(e, file.name)}>
                  <EditIcon width={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <div></div>
    </>
  );
};
