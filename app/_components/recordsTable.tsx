"use client";
import { IRecord } from "@/types/IRecord";
import { useState } from "react";
type Props = {
  history: IRecord[];

  filters?: {
    startDate?: string;
    endDate?: string;
    cycleWeeks?: number[];
    lifts?: string[];
    comments?: boolean;
  };
};
const RecordsTable = ({ history: records, filters }: Props) => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  return !showComment ? (
    <>
      <table className="table-auto border-collapse border border-slate-900 p-2">
        <thead>
          <tr>
            <th className={"p-2"}>date</th>
            <th className={"p-2"}>cycle week</th>
            <th className={"p-2"}>lift</th>
            <th className={"p-2"}>final weight</th>
            <th className={"p-2"}>final reps</th>
            <th className={"p-2"}>comments</th>
          </tr>
        </thead>
        <tbody>
          {records
            .filter((record: IRecord) => {
              if (filters) {
                const startDate = new Date(filters.startDate || "01-01-2021");
                const endDate = new Date(filters.endDate || "12-31-2999");
                const recordDate = new Date(record.date);
                return recordDate >= startDate && recordDate <= endDate;
              }
              return true;
            })
            .filter((record: IRecord) => {
              if (filters) {
                return filters.cycleWeeks?.includes(record.weekOfCycle);
              }
              return true;
            })
            .filter((record: IRecord) => {
              if (filters) {
                return filters.lifts?.includes(record.lift.toLowerCase());
              }
              return true;
            })
            .filter((record: IRecord) => {
              if (filters) {
                return filters.comments ? record.comments !== "" : true;
              }
              return true;
            })
            .map((record: IRecord, idx: number) => {
              const date = new Date(record.date);
              return (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? "bg-slate-950" : ""}`}
                >
                  <td>{date.toLocaleDateString()}</td>
                  <td className={"text-center"}>{record.weekOfCycle}</td>
                  <td className={"text-center"}>{record.lift}</td>
                  <td className={"text-center"}>{record.set3Weight}</td>
                  <td className={"text-center"}>{record.set3Reps}</td>
                  <td className={"text-center"}>
                    {record.comments !== "" ? (
                      <button
                        onClick={() => {
                          setShowComment(!showComment);
                          setComment(record.comments);
                        }}
                      >
                        &times;
                      </button>
                    ) : (
                      ""
                    )}{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  ) : (
    <div className="font-mono text-lime-500 relative min-h-full h-full  flex flex-col items-center justify-center border-collapse border border-slate-900 p-2 w-60 bg-slate-950 rounded-md">
      {comment}
      <button
        className="mt-20 mb-1"
        onClick={() => setShowComment(!showComment)}
      >
        back to table
      </button>
    </div>
  );
};

export default RecordsTable;
