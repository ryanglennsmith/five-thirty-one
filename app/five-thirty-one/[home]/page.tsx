import getUser from "@/services/getUser";
import getRecords from "@/services/getRecords";
import { ILifts } from "@/types/ILifts";
import { IRecord } from "@/types/IRecord";
import { MyNumbers, Records } from "@prisma/client";
import getWeights from "@/services/getWeights";
import TableOverallComponent from "@/app/_components/tableOverallComponent";

type Params = { params: { home: string } };
const FiveThirtyOne = async ({ params }: Params) => {
  const userName = params.home;
  //TODO move this to its own service file & do real auth
  const getUserId = async (userName: string): Promise<number> => {
    const user = await getUser(userName);
    if (!user) {
      console.log("no user found");
      return -1;
    }
    return user.ID;
  };
  const userId = await getUserId(userName);
  if (userId === -1) {
    return (
      <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
        <div className="text-4xl mt-60">no user</div>
      </div>
    );
  }
  const records = await getRecords(userId);
  const weights: MyNumbers = await getWeights(userId);
  const history: IRecord[] = records.map((record: Records) => {
    return {
      lift: record.Lift,
      set3Weight: record.Weight,
      set3Reps: record.Set_3_Reps,
      date: record.Date,
      comments: record.Comments,
      weekOfCycle: record.Week_Of_Cycle,
    };
  });
  const lifts: ILifts = {
    dl: weights.DL,
    sq: weights.SQ,
    bp: weights.BP,
    ohp: weights.OHP,
  };
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
      <div>
        <TableOverallComponent
          lifts={lifts}
          userId={userId}
          history={history}
        />
      </div>
    </div>
  );
};

export default FiveThirtyOne;
