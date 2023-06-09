import { useMutation } from "react-query";
import axios from "axios";

interface UpdateFileMutationVariables {
  fileName: string;
  newFileName: string;
  content: string;
}

const updateFile = async ({
  fileName,
  newFileName,
  content,
}: UpdateFileMutationVariables) => {
  const response = await axios.put(`/files/${fileName}`, { newFileName, content });

  return response.data;
};

export const useUpdateFileMutation = () => {
  return useMutation(updateFile);
};
