"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
type Props = {
  userId: number;
  lift: string;
  set3: number;
  weekOfCycle: number;
};
const AddRecordComponent = ({ userId, lift, set3, weekOfCycle }: Props) => {
  const router = useRouter();
  const date = new Date();
  const today = date.toISOString().split("T")[0];
  const [record, setRecord] = useState({
    userId: userId,
    lift: lift,
    set3: set3,
    date: today,
    set3Reps: 0,
    comments: "",
    weekOfCycle: weekOfCycle,
  });
  let defaultReps = 5;
  switch (weekOfCycle) {
    case 1:
      defaultReps = 5;
      break;
    case 2:
      defaultReps = 3;
      break;
    case 3:
      defaultReps = 1;
      break;
    case 4:
      defaultReps = 5;
      break;
    default:
      defaultReps = 5;
      break;
  }
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center mt-20">
      <h1>record</h1>
      <p>userId: {userId}</p>
      <p>lift: {lift}</p>
      <p>set3: {set3}</p>
      <p>date: {today}</p>
      <p>week of cycle: {weekOfCycle}</p>
      <p>set 3 reps:</p>
      <input
        className="text-2xl bg-slate-950 mt-2 w-10 p-1 text-center"
        type="number"
        name="reps"
        id="reps"
        step="0.1"
        defaultValue={defaultReps}
        onChange={(e) =>
          setRecord({ ...record, set3Reps: parseFloat(e.target.value) })
        }
      ></input>
      <p className="mt-2">comments:</p>
      <textarea
        className="text-2xl bg-slate-950 mt-2 mb-2 w-52 h-20"
        name="update"
        id="update"
        onChange={(e) => setRecord({ ...record, comments: e.target.value })}
      ></textarea>
      <div
        className={`text-4xl font-bold border-2 w-40 border-lime-500  bg-slate-900 items-center justify-center flex flex-col rounded m-2 mt-5`}
      >
        <button
          className="w-full"
          onClick={() =>
            router.push(
              `/five-thirty-one/commit/type=2&${record.userId}&${record.lift}=${record.set3}&date=${record.date}&set3Reps=${record.set3Reps}&week=${record.weekOfCycle}&comments=${record.comments}`
            )
          }
        >
          add record
        </button>
      </div>
    </div>
  );
};
export default AddRecordComponent;
