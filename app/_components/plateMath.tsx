"use client";
type Props = {
  barWeight: number;
  weightToLift: number;
  open: boolean;
  tableOpen: boolean;
};
const PlateMath = ({ barWeight, weightToLift, open }: Props) => {
  const splitPlates = (barWeight: number, weightToLift: number): number[] => {
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
  const plates = splitPlates(barWeight, weightToLift);
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full flex flex-col items-center justify-center">
      {" "}
      <div className="text-xl mt-40">
        math {weightToLift} ({barWeight} kg bar)
      </div>
      <div className="text-2xl">plates</div>
      <div className="flex flex-col items-left bg-slate-950 w-60 p-2 rounded-md">
        {plates.map((plate, idx) => (
          <div key={`${idx}, ${plate}`} className="text-xl">
            {plate}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlateMath;
