"use client";

import { useProvider } from "@/app/_components/_contexts/AppContext";
import { signUp } from "@/utils/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { setUser } = useProvider();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setConfirmPassword] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      setUser(res.data.user);
      router.replace("/");
      console.log(res);
    },
  });

  const router = useRouter();

  console.log(isPending);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("trialsssssssss");
          mutate({ name, email, password, passwordConfirm });
        }}
      >
        <h2 className="text-xl font-bold text-center">Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded-lg"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-lg"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          // type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-lg"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="confirmPassword"
          placeholder="Confirm password"
          className="w-full p-2 border rounded-lg"
          required
          value={passwordConfirm}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
          disabled={isPending}
        >
          Register
        </button>

        <p
          // onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-center text-blue-500 cursor-pointer"
        >
          Already have an account? Log in
        </p>
      </form>
    </div>
  );
}
