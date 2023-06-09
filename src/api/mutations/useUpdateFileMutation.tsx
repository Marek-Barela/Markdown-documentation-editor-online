import { useMutation } from "react-query";
import axios from "axios";

interface UpdateFileMutationVariables {
  fileName: string;
  content: string;
}

const updateFile = async ({ fileName, content }: UpdateFileMutationVariables) => {
  const response = await axios.patch(`/files/${fileName}`, { content });

  return response.data;
};

export const useUpdateFileMutation = () => {
  return useMutation(updateFile);
};
