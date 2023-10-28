import getWeights from "@/services/getWeights";
import { ILifts } from "@/types/ILifts";
import { Scheme, IScheme } from "@/types/IScheme";
import { MyNumbers } from "@prisma/client";
import Link from "next/link";
import RecordButton from "./recordButton";
import TableGenerator from "./tableGenerator";
import { useStore } from "@/app/_store/store";

const WeightsPageComponent = async () => {
  const scheme = new Scheme();
  //   const weights: MyNumbers = await getWeights(userId);
  //   const lifts: ILifts = {
  //     dl: weights.DL,
  //     sq: weights.SQ,
  //     bp: weights.BP,
  //     ohp: weights.OHP,
  //   };
  //   const litLifts = Object.keys(lifts);
  return <TableGenerator />;
};

export default WeightsPageComponent;
