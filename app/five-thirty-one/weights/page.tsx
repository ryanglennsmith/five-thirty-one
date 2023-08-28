import { ILifts } from "@/types/ILifts";
import { IScheme, Scheme } from "@/types/IScheme";
import Link from "next/link";
type plan = {
  [key: string]: number;
};
type Props = {};
const Weights = ({}: Props) => {
  // TODO get the lifts and bar from the db / config
  const lifts: ILifts = { dl: 165, sq: 117, bp: 70, ohp: 48 };
  const bar = 20;
  const scheme = new Scheme();
  const litLifts = Object.keys(lifts);
  const litScheme = Object.keys(scheme);
  const mathUrlGenerator = (bar: number, weight: number): string => {
    return `plate-math/${bar}/${weight}`;
  };
  const tdGenerator = (weight: number) => {
    return (
      <td className="p-1">
        <Link href={mathUrlGenerator(bar, weight)}>{weight}</Link>
      </td>
    );
  };
  const setGenerator = (set: [string, number][], num: number): JSX.Element => {
    return (
      <tr className={`${num % 2 === 0 ? "bg-slate-950" : ""}`}>
        <td>set {num}</td>
        <td></td>
        {set.map((l) => {
          return tdGenerator(l[1]);
        })}
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
          <td>
            <Link href={`update/${lift}`}>u?</Link>
          </td>
        </tr>

        {baseGenerator(lift)}

        {setGenerator(set1, 1)}
        {setGenerator(set2, 2)}
        {setGenerator(set3, 3)}
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
        <td></td>
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
            lookup
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
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
      <div className="text-2xl mt-40">weights</div>
      {tableGenerator(lifts, litLifts, scheme)}
    </div>
  );
};
export default Weights;
