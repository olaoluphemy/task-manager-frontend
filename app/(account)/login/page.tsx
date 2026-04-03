"use client";

import { useProvider } from "@/app/_components/_contexts/AppContext";
import { login } from "@/utils/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { setUser } = useProvider();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setUser(res.data.user);
      router.replace("/");
      console.log(res);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ email, password });
        }}
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-lg"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          //   type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-lg"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
          disabled={isPending}
        >
          Login
        </button>

        <p
          onClick={() => router.push("/signup")}
          className="text-sm text-center text-blue-500 cursor-pointer"
        >
          No account? Sign up
        </p>
      </form>
    </div>
  );
}
