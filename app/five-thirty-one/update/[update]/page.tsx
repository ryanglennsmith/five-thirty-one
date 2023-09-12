"use client";
import ButtonFrame from "@/app/_components/button";
import { ILifts } from "@/types/ILifts";
import { useState } from "react";
const UpdatePage = ({ params }: { params: { update: string } }) => {
  // TODO go get the lifts
  const defineUpdate = (lift: string, current: number): number => {
    if (lift === "dl" || lift === "sq") {
      return current + 5;
    } else {
      return current + 2.5;
    }
  };
  const lifts: ILifts = { dl: 165, sq: 117, bp: 70, ohp: 48 };
  const litLifts = Object.keys(lifts);
  const currentWeight: number = lifts[params.update as keyof ILifts];
  const currentLift: string = params.update;
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
      />
    </div>
  );
};
export default UpdatePage;
