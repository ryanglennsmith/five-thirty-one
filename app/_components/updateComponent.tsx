"use client";
import { ILifts } from "@/types/ILifts";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
type Props = {
  lifts: ILifts;
  liftToUpdate: string;
  currentWeight: number;
  userId: number;
};
const UpdateComponent = ({
  lifts,
  liftToUpdate,
  currentWeight,
  userId,
}: Props) => {
  const router = useRouter();
  const defineUpdate = (lift: string, current: number): number => {
    if (lift === "dl" || lift === "sq") {
      return current + 5;
    } else {
      return current + 2.5;
    }
  };
  const [update, setUpdate] = useState(
    defineUpdate(liftToUpdate, currentWeight)
  );

  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center mt-40">
      <h1 className="text-4xl">update {liftToUpdate}?</h1>
      <div className="text-2xl">current: {currentWeight}</div>

      <div className="text-2xl mt-2">
        new: (default is {defineUpdate(liftToUpdate, currentWeight)}){" "}
      </div>

      <input
        className="text-2xl bg-slate-950 mt-2"
        type="number"
        name="update"
        id="update"
        value={update}
        step="0.1"
        onChange={(e) => setUpdate(parseFloat(e.target.value))}
      ></input>
      <div
        className={`text-4xl font-bold border-2 w-40 border-lime-500  bg-slate-900 items-center justify-center flex flex-col rounded mt-5 m-2`}
      >
        <button
          onClick={() =>
            router.push(
              `/five-thirty-one/commit/type=1&${userId}&${liftToUpdate}=${update}`
            )
          }
        >
          send update
        </button>
      </div>
    </div>
  );
};

export default UpdateComponent;
