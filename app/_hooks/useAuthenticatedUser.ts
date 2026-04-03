import { getAuthenticatedUser } from "@/utils/services/auth";
import { useQuery } from "@tanstack/react-query";

export function useAuthenticatedUser() {
  const res = useQuery({
    queryFn: () => getAuthenticatedUser(),
    queryKey: ["user"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  return res;
}
