"use client";
import { useRouter } from "next/navigation";

type Props = {
  btnType: string;
  btnText: string;
  marginTop?: string;
  btnMsg?: string;
  userId?: number;
  liftAndWeight?: { lift: string; weight: number };
  userName?: string;
  recordToSet?: {
    userId: number;
    lift: string;
    set3: number;
    date: string;
    set3Reps: number;
    comments: string;
    weekOfCycle: number;
  };
  filters?: {
    date?: string[];
    weekOfCycle?: number[];
    lift?: string[];
    comments?: boolean;
  };
};
const ButtonFrame = ({
  btnType,
  btnText,
  marginTop,
  btnMsg,
  userId,
  liftAndWeight,
  userName,
  recordToSet,
  filters,
}: Props) => {
  // const showRecords = useStore((state) => state.showRecords);
  // const updateShowRecords = useStore((state) => state.updateShowRecords);
  // const { showRecords, showTable } = useStore.getState().uiState;
  // const toggleShowTable = useStore((state) => state.uiState.toggleShowTable);
  const router = useRouter();
  const handleClick = (type: string): void => {
    switch (type) {
      case "login":
        router.push(`/five-thirty-one/${userName}`);
        break;
      case "getWeights":
        console.log("getWeights");
        // toggleShowTable();
        break;
      case "update":
        router.push(
          `/five-thirty-one/commit/type=1&${userId}&${liftAndWeight?.lift}=${liftAndWeight?.weight}`
        );
        break;
      case "record":
        router.push(
          `/five-thirty-one/commit/type=2&${recordToSet?.userId}&${recordToSet?.lift}=${recordToSet?.set3}&date=${recordToSet?.date}&set3Reps=${recordToSet?.set3Reps}&week=${recordToSet?.weekOfCycle}&comments=${recordToSet?.comments}`
        );
        break;
      case "getRecords":
        router.push(`/five-thirty-one/history/${userId}`);
        break;
      case "sortRecords":
        router.push(`/five-thirty-one/history/${userId}`);
        break;
      case "hoohah":
        // updateShowRecords(!showRecords);
        console.log("hoohah");
        // console.log(`showRecords: ${showRecords}`);
        break;
      default:
        console.log("default btn press, no fn assigned");

        return;
    }
  };
  return (
    <div
      className={`text-4xl font-bold border-2 w-40 border-lime-500  bg-slate-900 items-center justify-center flex flex-col rounded ${marginTop} m-2`}
    >
      {/* <StoreInitializer
        showRecords={showRecords}
        showCalculator={false}
        showTable={false}
        weightForMath={0}
      /> */}
      <button
        className="w-full"
        onClick={() => handleClick(btnType)}
        disabled={userId === -1}
      >
        {btnText}
      </button>
    </div>
  );
};

export default ButtonFrame;
