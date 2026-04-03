import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_hooks/useUser";

export default function AccountWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data, isPending } = useUser();

  const isLoggedIn = !!data?.data?.data?.email;

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);

  if (isPending || data?.data?.data) return null;

  return <div>{children}</div>;
}
