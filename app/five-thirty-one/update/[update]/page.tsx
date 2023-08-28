import ButtonFrame from "@/app/_components/button";
import { ILifts } from "@/types/ILifts";
const UpdatePage = ({ params }: { params: { update: string } }) => {
  // TODO go get the lifts
  const lifts: ILifts = { dl: 165, sq: 117, bp: 70, ohp: 48 };
  const litLifts = Object.keys(lifts);
  const currentWeight = lifts[params.update as keyof ILifts];
  const currentLift = params.update;
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center mt-40">
      <h1 className="text-4xl">update {currentLift}?</h1>
      <div className="text-2xl">current: {currentWeight}</div>
      <div className="text-2xl mt-2">new: </div>
      <input
        className="text-2xl bg-slate-950 mt-2"
        // type="number"
        name="update"
        id="update"
        placeholder={`default: ${
          currentLift === "dl" || currentLift === "sq"
            ? currentWeight + 5
            : currentWeight + 2.5
        } kg`}
      ></input>
      <ButtonFrame btnType="update" btnText="update" marginTop="mt-4" />
    </div>
  );
};
export default UpdatePage;
