import { useMutation } from "react-query";
import axios from "axios";

interface CreateFileMutationVariables {
  fileName: string;
}

const createFile = async ({ fileName }: CreateFileMutationVariables) => {
  const response = await axios.post(`/files/${fileName}`);
  return response.data;
};

export const useCreateFileMutation = () => {
  return useMutation(createFile);
};
