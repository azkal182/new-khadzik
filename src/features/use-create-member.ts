import { createMember } from "@/actions/member-action";
import { useMutation } from "@tanstack/react-query";

const useCreateMember = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (body: any) => {
      return createMember(body);
    },
    onSuccess,
  });
};

export default useCreateMember;
