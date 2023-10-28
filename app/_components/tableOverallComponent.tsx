"use client";
import { ILifts } from "@/types/ILifts";
import { IRecord } from "@/types/IRecord";
import { IScheme, Scheme } from "@/types/IScheme";
import Link from "next/link";
import { useState } from "react";
import PlateMath from "./plateMath";
import Sorting from "./sorting";
import AddRecordComponent from "./addRecord";
import UpdateComponent from "./updateComponent";

type plan = {
  [key: string]: number;
};
type Props = {
  userId: number;
  lifts: ILifts;
  history: IRecord[];
};
const TableOverallComponent = ({ userId, lifts, history }: Props) => {
  const initUi = {
    weights: {
      showList: false,
    },
    buttons: {
      showMain: true,
    },
    math: {
      show: false,
      weight: 0,
      bar: 20,
    },
    records: {
      showList: false,
      showAdd: false,
      lift: "",
      user: 0,
      week: 0,
      set3: 0,
    },
    update: {
      show: false,
      lift: "",
      user: 0,
    },
  };
  const [uiState, setUiState] = useState(initUi);
  const bar = 20;
  const scheme = new Scheme();
  const litLifts = Object.keys(lifts);
  const tdGenerator = (
    bar: number,
    weight: number,
    set: number,
    idx: number
  ): JSX.Element => {
    return (
      <td
        className="p-1 cursor-pointer"
        key={bar + weight + set + idx}
        onClick={() => {
          setUiState({
            ...uiState,
            math: { show: true, weight: weight, bar: bar },
            weights: { ...uiState.weights, showList: false },
          });
        }}
      >
        {weight}
      </td>
    );
  };
  const setGenerator = (set: [string, number][], num: number): JSX.Element => {
    return (
      <tr className={`${num % 2 === 0 ? "bg-slate-950" : ""}`}>
        <td>set {num}</td>
        <td></td>
        {set.map((l, idx) => {
          return tdGenerator(bar, l[1], num, idx);
        })}
      </tr>
    );
  };
  const recordButtonGenerator = (
    lift: string,
    set3: [string, number][]
  ): JSX.Element => {
    return (
      <tr className="bg-slate-950">
        <td>record</td>
        <td></td>
        <td
          className="text-center cursor-pointer"
          onClick={() =>
            setUiState({
              ...uiState,
              weights: { ...uiState.weights, showList: false },
              records: {
                ...uiState.records,
                lift: lift,
                week: 1,
                set3: set3[0][1],
                showAdd: true,
              },
            })
          }
        >
          &times;
        </td>
        <td
          className="text-center cursor-pointer"
          onClick={() =>
            setUiState({
              ...uiState,
              weights: { ...uiState.weights, showList: false },
              records: {
                ...uiState.records,
                lift: lift,
                week: 2,
                set3: set3[1][1],
                showAdd: true,
              },
            })
          }
        >
          &times;
        </td>
        <td
          className="text-center cursor-pointer"
          onClick={() =>
            setUiState({
              ...uiState,
              weights: { ...uiState.weights, showList: false },
              records: {
                ...uiState.records,
                lift: lift,
                week: 3,
                set3: set3[2][1],
                showAdd: true,
              },
            })
          }
        >
          &times;
        </td>
        <td
          className="text-center cursor-pointer"
          onClick={() =>
            setUiState({
              ...uiState,
              weights: { ...uiState.weights, showList: false },
              records: {
                ...uiState.records,
                lift: lift,
                week: 4,
                set3: set3[3][1],
                showAdd: true,
              },
            })
          }
        >
          &times;
        </td>
      </tr>
    );
  };
  const weekSetGenerator = (set: [string, number][]): JSX.Element => {
    const lift =
      set[0][0].substring(0, 3) !== "ohp" ? set[0][0].substring(0, 2) : "ohp";
    const set1 = set.filter(([lift, weight]) => lift.includes("s1"));
    const set2 = set.filter(([lift, weight]) => lift.includes("s2"));
    const set3 = set.filter(([lift, weight]) => lift.includes("s3"));
    return (
      <>
        <tr className="bg-slate-800">
          <td>{lift}</td>
          <td>{lifts[lift as keyof ILifts]}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        {baseGenerator(lift)}

        {setGenerator(set1, 1)}
        {setGenerator(set2, 2)}
        {setGenerator(set3, 3)}
        {recordButtonGenerator(lift, set3)}
      </>
    );
  };

  const layoutWeekAndSet = (planArr: [string, number][]): JSX.Element => {
    const dl = planArr.filter(([lift, weight]) => lift.includes("dl"));

    const sq = planArr.filter(([lift, weight]) => lift.includes("sq"));

    const bp = planArr.filter(([lift, weight]) => lift.includes("bp"));
    const ohp = planArr.filter(([lift, weight]) => lift.includes("ohp"));

    return (
      <>
        {weekSetGenerator(dl)}
        {weekSetGenerator(sq)}
        {weekSetGenerator(bp)}
        {weekSetGenerator(ohp)}
      </>
    );
  };

  const baseGenerator = (lift: string): JSX.Element => {
    return (
      <tr className="bg-slate-950">
        <td>base</td>
        <td>({scheme.CalculateBase(lifts[lift as keyof ILifts])})</td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          {/* updates */}
          <div
            className="flex flex-row justify-center align-middle cursor-pointer"
            onClick={() => {
              setUiState({
                ...uiState,
                weights: { ...uiState.weights, showList: false },
                update: {
                  ...uiState.update,
                  show: true,
                  lift: lift,
                  user: userId,
                },
              });
            }}
          >
            u?
          </div>
        </td>
      </tr>
    );
  };
  const schemeLookup = (scheme: Scheme, key: keyof IScheme): number => {
    let result;
    result = scheme[key];
    return parseFloat(result.toString());
  };
  const tableGenerator = (
    lifts: ILifts,
    litLifts: string[],
    scheme: Scheme
  ): JSX.Element => {
    let plan: plan = {};
    litLifts.forEach((l) => {
      for (let i = 1; i < litLifts.length; i++) {
        for (let j = 1; j < 5; j++) {
          let week = `w${j}`;
          let set = `s${i}`;
          let weekSetKey = `${week}${set}` as keyof IScheme;
          let lookup = schemeLookup(scheme, weekSetKey);

          plan[`${l}${week}${set}`] = scheme.Calculate(
            lifts[l as keyof ILifts],
            lookup,
            l
          );
        }
      }
    });

    let planArr = Object.entries(plan);
    return (
      <table className="table-auto border-collapse border border-slate-900 p-2">
        <thead>
          <tr className="text-xl">
            <th className="border border-slate-900 p-1">lift</th>
            <th className="border border-slate-900 p-1">1rm</th>
            <th className="border border-slate-900 p-1">w1 5+</th>
            <th className="border border-slate-900 p-1">w2 3+</th>
            <th className="border border-slate-900 p-1">w3 1+</th>
            <th className="border border-slate-900 p-1">w4 5 </th>
          </tr>
        </thead>
        <tbody>
          <></>
          <>{layoutWeekAndSet(planArr)}</>
        </tbody>
      </table>
    );
  };
  return (
    <>
      {uiState.buttons.showMain && (
        <div className="flex flex-col items-center">
          <div className="text-4xl mt-10">531</div>
          <div className="flex flex-row">
            <div
              className={`text-4xl font-bold border-2 w-40 border-lime-500  bg-slate-900 items-center justify-center flex flex-col rounded m-2 mt-5`}
            >
              <button
                className="w-full"
                onClick={() =>
                  setUiState({
                    ...uiState,
                    weights: { ...uiState.weights, showList: true },
                    buttons: { ...uiState.buttons, showMain: false },
                  })
                }
              >
                get weights
              </button>
            </div>
            <div
              className={`text-4xl font-bold border-2 w-40 border-lime-500  bg-slate-900 items-center justify-center flex flex-col rounded m-2 mt-5`}
            >
              <button
                className="w-full"
                onClick={() =>
                  setUiState({
                    ...uiState,
                    records: { ...uiState.records, showList: true },
                    buttons: { ...uiState.buttons, showMain: false },
                  })
                }
                disabled={userId === -1}
              >
                get records
              </button>
            </div>
          </div>
        </div>
      )}
      {uiState.weights.showList && (
        <div className="font-mono text-lime-500 relative min-h-full h-full flex flex-col items-center justify-center">
          <div className="text-4xl mt-10">weights</div>
          {tableGenerator(lifts, litLifts, scheme)}
          <div
            className="cursor-pointer"
            onClick={() => {
              setUiState({
                ...uiState,
                weights: { ...uiState.weights, showList: false },
                buttons: { ...uiState.buttons, showMain: true },
              });
            }}
          >
            &times;
          </div>
        </div>
      )}
      {uiState.math.show && (
        <div className="flex flex-col items-center">
          <PlateMath
            barWeight={uiState.math.bar}
            weightToLift={uiState.math.weight}
            open={uiState.math.show}
            tableOpen={uiState.weights.showList}
          />
          <div
            className="cursor-pointer"
            onClick={() => {
              setUiState({
                ...uiState,
                math: { ...uiState.math, show: false },
                weights: { ...uiState.weights, showList: true },
              });
            }}
          >
            &times;
          </div>
        </div>
      )}
      {uiState.records.showList && (
        <div className="flex flex-col items-center mt-10">
          <Sorting records={history} />
          <div
            className="cursor-pointer"
            onClick={() => {
              setUiState({
                ...uiState,
                records: { ...uiState.records, showList: false },
                buttons: { ...uiState.buttons, showMain: true },
              });
            }}
          >
            &times;
          </div>
        </div>
      )}
      {uiState.records.showAdd && (
        <div className="flex flex-col items-center">
          <AddRecordComponent
            userId={userId}
            lift={uiState.records.lift}
            set3={uiState.records.set3}
            weekOfCycle={uiState.records.week}
          />
          <div
            className="cursor-pointer"
            onClick={() =>
              setUiState({
                ...uiState,
                weights: { ...uiState.weights, showList: true },
                records: { ...uiState.records, showAdd: false },
              })
            }
          >
            &times;
          </div>
        </div>
      )}
      {uiState.update.show && (
        <UpdateComponent
          userId={userId}
          liftToUpdate={uiState.update.lift}
          lifts={lifts}
          currentWeight={lifts[uiState.update.lift as keyof ILifts]}
        />
      )}
    </>
  );
};

export default TableOverallComponent;
