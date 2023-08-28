"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { btnType: string; btnText: string; marginTop?: string };
const ButtonFrame = ({ btnType, btnText, marginTop }: Props) => {
  const [msg, setMsg] = useState("henlo");
  const router = useRouter();
  const handleClick = (type: string): void => {
    switch (type) {
      case "login":
        router.push("/five-thirty-one");
        break;
      case "getWeights":
        router.push("/five-thirty-one/weights");
        break;
      case "update":
        //TODO send to db
        break;
      default:
        console.log("default btn press, no fn assigned");
        const inc = msg.substring(6) ? parseInt(msg.substring(6)) + 1 : 1;
        setMsg("henlo " + inc);
        console.log(msg);
        return;
    }
  };
  return (
    <div
      className={`text-4xl font-bold border-2 w-40 border-lime-500  bg-slate-900 items-center justify-center flex flex-col rounded ${marginTop} m-2`}
    >
      <button className="w-full" onClick={() => handleClick(btnType)}>
        {btnText}
      </button>
    </div>
  );
};

export default ButtonFrame;
