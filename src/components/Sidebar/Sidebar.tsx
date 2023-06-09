import useFilesQuery from "src/api/queries/useFilesQuery";
import { ReactComponent as Folder } from "src/components/SVG/Folder.svg";
import { ReactComponent as Document } from "src/components/SVG/Document.svg";
import { File } from "src/types/file";

interface SidebarProps {
  onNavigationClick: (fileName: string) => void;
  currentlyActiveFile: string;
}

export const Sidebar = ({ onNavigationClick, currentlyActiveFile }: SidebarProps) => {
  const { data } = useFilesQuery();

  return (
    <>
      <aside className="w-[300px] bg-[#242424] min-h-full h-screen flex flex-col items-center pt-5 pb-2 space-y-7 fixed">
        <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
          <div className="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase">
            Menu
          </div>
          {data?.map((file: File) => (
            <div
              key={file.id}
              className="w-full flex items-center gap-x-1.5 group select-none cursor-pointer"
              onClick={() => onNavigationClick(file.name)}>
              <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 w-full h-[102%] ${
                    currentlyActiveFile === file.name ? "" : "translate-y-full"
                  } group-hover:translate-y-0 bg-red-600 transition-all duration-300`}></div>
              </div>
              <div
                className={`${
                  currentlyActiveFile === file.name ? "bg-white/10 text-white" : ""
                } group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm`}>
                <Document width={24} />
                <span className="font-QuicksandMedium">{file.name}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <div></div>
    </>
  );
};
