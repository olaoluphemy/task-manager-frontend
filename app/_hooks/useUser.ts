import { useEffect } from "react";
import { useProvider } from "../_components/_contexts/AppContext";
import { useAuthenticatedUser } from "./useAuthenticatedUser";

export function useUser() {
  const { setUser } = useProvider();

  const { isPending, data } = useAuthenticatedUser();

  useEffect(() => {
    if (data?.data?.data) setUser(data?.data.data);
  }, [data, setUser]);

  return { isPending, data };
}
