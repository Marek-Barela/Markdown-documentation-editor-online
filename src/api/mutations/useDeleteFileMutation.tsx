import { useMutation } from "react-query";
import axios from "axios";

interface DeleteFileMutationVariables {
  fileName: string;
}

const deleteFile = async ({ fileName }: DeleteFileMutationVariables) => {
  const response = await axios.delete(`/files/${fileName}`);
  return response.data;
};

export const useDeleteFileMutation = () => {
  return useMutation(deleteFile);
};
