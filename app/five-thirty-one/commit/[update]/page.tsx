import setWeight from "../../../../services/setWeight";
type Params = { params: { update: string } };
const UpdatePage = async ({ params }: Params) => {
  const userId = parseInt(params.update.split("%26")[0]);
  const updateFromStr = params.update.split("%26")[1].split("%3D");
  const update = {
    lift: updateFromStr[0],
    weight: parseFloat(updateFromStr[1]),
  };

  const req = await setWeight(update.weight, update.lift, userId);
  console.log(req);
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
      <p>update:userid = {userId}</p>
      <p>dl: {req.DL}</p>
      <p>sq: {req.SQ}</p>
      <p>bp: {req.BP}</p>
      <p>ohp: {req.OHP}</p>
    </div>
  );
};
export default UpdatePage;
