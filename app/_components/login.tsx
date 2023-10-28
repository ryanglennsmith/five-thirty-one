"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const handleClick = (userName: string) => {
    router.push(`/five-thirty-one/${userName}`);
  };
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
      <input
        className="text-2xl bg-slate-950 mt-80"
        type="text"
        name="username"
        id="username"
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <div
        className={`text-4xl font-bold border-2 w-40 border-lime-500  bg-slate-900 items-center justify-center flex flex-col rounded m-2 mt-5`}
      >
        <button className="w-full" onClick={() => handleClick(userName)}>
          login
        </button>
      </div>
    </div>
  );
}
