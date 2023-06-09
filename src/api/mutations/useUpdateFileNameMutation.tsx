import { useMutation } from "react-query";
import axios from "axios";

interface UpdateFileNameMutationVariables {
  fileName: string;
  newFileName: string;
}

const updateFileName = async ({
  fileName,
  newFileName,
}: UpdateFileNameMutationVariables) => {
  const response = await axios.put(`/files/${fileName}`, { newFileName });

  return response.data;
};

export const useUpdateFileNameMutation = () => {
  return useMutation(updateFileName);
};
