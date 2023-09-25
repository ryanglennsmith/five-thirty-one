import ButtonFrame from "@/app/_components/button";
type Params = { params: { calculator: string[] } };
const PlateMath = ({ params }: Params) => {
  const splitPlates = (weightStr: string, barStr: string): number[] => {
    const barWeight = parseFloat(barStr);

    const weightToLift = parseFloat(weightStr);
    // this magic array could be replaced with user input/persistent storage
    const platesAvailable = [20, 15, 10, 5, 2.5, 2, 1.25, 1, 0.5];
    const platesToAdd: number[] = [];
    let weightLeft = (weightToLift - barWeight) / 2;

    for (let i = 0; i < platesAvailable.length; i++) {
      if (weightLeft >= platesAvailable[i]) {
        platesToAdd.push(platesAvailable[i]);
        weightLeft -= platesAvailable[i];
        if (weightLeft >= platesAvailable[i]) {
          i--;
        }
      }
    }
    return platesToAdd;
  };
  const bar = params.calculator[0];
  const weight = params.calculator[1];
  const plates = splitPlates(weight, bar);
  const set = params.calculator[2];
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
      {" "}
      <div className="text-xl mt-40">
        math {weight} ({bar} kg bar)
      </div>
      <div className="text-2xl">plates</div>
      <div className="flex flex-col items-left bg-slate-800 w-20 p-2 rounded-md">
        {plates.map((plate, idx) => (
          <div key={`${idx}, ${plate}`} className="text-xl">
            {plate}
          </div>
        ))}
      </div>
      {set === "3" && (
        <div className="flex flex-col items-center">
          <div className="text-xl">set {set}</div>
          <input
            placeholder="hoohah"
            className="text-2xl bg-slate-950 mt-2"
          ></input>
          <ButtonFrame btnType="setThreeNotes" btnText="add notes" />
        </div>
      )}
    </div>
  );
};
export default PlateMath;
