import axios from "../axiosConfig";
import { useQuery } from "react-query";

const useFileQuery = (fileName: string) => {
  const fetchFileContent = async () => {
    if (!fileName) {
      return null;
    }

    const response = await axios.get(`/files/${fileName}`);
    return response.data;
  };

  return useQuery(["fileContent", fileName], fetchFileContent);
};

export default useFileQuery;
