import axios from "../axiosConfig";
import { useQuery } from "react-query";

const useFilesList = () => {
  const fetchFiles = async () => {
    const response = await axios.get("/files");
    return response.data;
  };

  return useQuery("files", fetchFiles);
};

export default useFilesList;
