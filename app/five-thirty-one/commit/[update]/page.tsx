import Link from "next/link";
import setWeight from "@/services/setWeight";
import setRecord from "@/services/setRecord";
import getUserName from "@/services/getUserName";
type Params = { params: { update: string } };
const UpdatePage = async ({ params }: Params) => {
  const commitType = parseInt(params.update.split("%26")[0].split("%3D")[1]);
  console.log(`commitType: ${commitType}`);
  const userId = parseInt(params.update.split("%26")[1]);
  console.log(`userId: ${userId}`);
  const user = await getUserName(userId);
  const userName = user?.Name;
  console.log(`userName: ${userName}`);
  let commitUpdateToLift = { lift: "", weight: 0, id: userId };
  let commitUpdateToRecord = {
    userId: userId,
    lift: "",
    set3: 0,
    date: "",
    set3Reps: 0,
    comments: "",
    weekOfCycle: 0,
  };
  let updateFromStr;
  let weightsReq;
  let recordReq;
  if (commitType === 1) {
    updateFromStr = params.update.split("%26")[2].split("%3D");
    commitUpdateToLift.lift = updateFromStr[0];
    commitUpdateToLift.weight = parseFloat(updateFromStr[1]);
    weightsReq = await setWeight(commitUpdateToLift);
  }
  if (commitType === 2) {
    updateFromStr = params.update.split("%26");
    commitUpdateToRecord.lift = updateFromStr[2].split("%3D")[0];
    commitUpdateToRecord.set3 = parseFloat(updateFromStr[2].split("%3D")[1]);
    commitUpdateToRecord.date = updateFromStr[3].split("%3D")[1];
    commitUpdateToRecord.set3Reps = parseFloat(
      updateFromStr[4].split("%3D")[1]
    );
    commitUpdateToRecord.weekOfCycle = parseInt(
      updateFromStr[5].split("%3D")[1]
    );
    commitUpdateToRecord.comments =
      updateFromStr[6].split("%3D")[1].replace(/%20/g, " ") || "";
    recordReq = await setRecord(commitUpdateToRecord);
  }
  console.log(params.update);
  console.table(commitUpdateToLift);
  console.table(commitUpdateToRecord);
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
      <p>update: userid = {userId}</p>
      {commitType === 1 && weightsReq && (
        <>
          <p>dl: {weightsReq.DL}</p>
          <p>sq: {weightsReq.SQ}</p>
          <p>bp: {weightsReq.BP}</p>
          <p>ohp: {weightsReq.OHP}</p>
        </>
      )}
      {commitType === 2 && recordReq && (
        <>
          <p>userName: {userName}</p>
          <p>lift: {recordReq.Lift}</p>
          <p>weight: {recordReq.Weight}</p>
          <p>date: {recordReq.Date}</p>
          <p>week of cycle: {recordReq.Week_Of_Cycle}</p>
          <p>set 3 reps: {recordReq.Set_3_Reps}</p>
          <p>comments: {recordReq.Comments}</p>
        </>
      )}

      <Link href={`/five-thirty-one/${userName}`} prefetch={false}>
        &times;
      </Link>
    </div>
  );
};
export default UpdatePage;
