import { useEffect } from "react";
// import { useProvider } from "./AppContext";
import { useRouter } from "next/navigation";
// import { useAuthenticatedUser } from "@/app/_hooks/useAuthenticatedUser";
import { useUser } from "@/app/_hooks/useUser";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data, isPending } = useUser();

  const isLoggedIn = !!data?.data?.data?.email;

  useEffect(() => {
    if (!isLoggedIn && !isPending) router.replace("/login");
  }, [isLoggedIn, router, isPending]);

  if (isPending) return null;

  return <div>{children}</div>;
}
