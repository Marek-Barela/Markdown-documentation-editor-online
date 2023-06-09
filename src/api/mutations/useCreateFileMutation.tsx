import { useMutation } from "react-query";
import axios from "axios";

const createFile = async (fileName: string) => {
  const response = await axios.post(`/files/${fileName}`);
  return response.data;
};

export const useCreateFileMutation = () => {
  return useMutation(createFile);
};
