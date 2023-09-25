"use client";
import ButtonFrame from "@/app/_components/button";
import getWeights from "@/services/getWeights";
import { ILifts } from "@/types/ILifts";
import { useState, useEffect } from "react";
type Params = { params: { update: string[] } };
const UpdatePage = ({ params }: Params) => {
  const lifts: ILifts = Object.create(null);
  const re = /%\w{2}/gi;
  const paramLifts = params.update[2].split(re);
  paramLifts.forEach((lift, idx) => {
    if (idx % 2 === 0) {
      lifts[lift as keyof ILifts] = parseFloat(paramLifts[idx + 1]);
    }
  });
  console.log(paramLifts);
  const defineUpdate = (lift: string, current: number): number => {
    if (lift === "dl" || lift === "sq") {
      return current + 5;
    } else {
      return current + 2.5;
    }
  };
  const userId = parseInt(params.update[0]);

  const litLifts = Object.keys(lifts);
  const currentWeight: number = lifts[params.update[1] as keyof ILifts];
  const currentLift: string = params.update[1];
  const [update, setUpdate] = useState(
    defineUpdate(currentLift, currentWeight)
  );

  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center mt-40">
      <h1 className="text-4xl">update {currentLift}?</h1>
      <div className="text-2xl">current: {currentWeight}</div>

      <div className="text-2xl mt-2">
        new: (default is {defineUpdate(currentLift, currentWeight)}){" "}
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
      <ButtonFrame
        btnType="update"
        btnText="update"
        marginTop="mt-4"
        btnMsg={update.toString()}
        userId={2}
        liftAndWeight={{ lift: currentLift, weight: update }}
      />
    </div>
  );
};
export default UpdatePage;
