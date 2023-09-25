"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import setWeight from "../../services/setWeight";
type Props = {
  btnType: string;
  btnText: string;
  marginTop?: string;
  btnMsg?: string;
  userId?: number;
  liftAndWeight?: { lift: string; weight: number };
};
const ButtonFrame = ({
  btnType,
  btnText,
  marginTop,
  btnMsg,
  userId,
  liftAndWeight,
}: Props) => {
  const [msg, setMsg] = useState("henlo");
  const [doUpdate, setDoUpdate] = useState(false);
  const router = useRouter();
  const handleClick = (type: string): void => {
    switch (type) {
      case "login":
        router.push(`/five-thirty-one/${userId}`);
        break;
      case "getWeights":
        router.push(`/five-thirty-one/weights/${userId}`);
        break;
      case "update":
        router.push(
          `/five-thirty-one/commit/${userId}&${liftAndWeight?.lift}=${liftAndWeight?.weight}`
        );

        break;
      default:
        console.log("default btn press, no fn assigned");
        const inc = msg.substring(6) ? parseInt(msg.substring(6)) + 1 : 1;
        setMsg("henlo " + inc);
        console.log(msg);
        return;
    }
  };
  useEffect(() => {
    if (doUpdate && liftAndWeight && userId) {
      setWeight(liftAndWeight.weight, liftAndWeight.lift, userId);
      setDoUpdate(false);
    }
  }, [doUpdate, liftAndWeight, userId]);
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
