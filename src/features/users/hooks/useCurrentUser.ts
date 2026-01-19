import { userApi } from "@/lib/api";
import { CURRENT_USER_QUERY_KEY } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: () => userApi.getCurrentUser(),
  });
};

export default useCurrentUser;
