import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/actions/member-action";

const useFetchMember = () => {
  return useQuery({
    queryFn: async () => {
      return getMembers();
    },
  });
};

export default useFetchMember;
