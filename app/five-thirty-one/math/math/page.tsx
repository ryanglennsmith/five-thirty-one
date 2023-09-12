const MathPage = ({ params }: { params: { math: string } }) => {
  const splitPlates = (weightStr: string, bar: string): number[] => {
    const barWeight = parseFloat(bar);

    const weightToLift = parseFloat(weightStr);
    // this magic array could be replaced with user input/persistent storage
    const platesAvailable = [20, 15, 10, 5, 2.5, 1.25];
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

  // const urlstr = params.math;

  // const weight = urlstr.split("%26")[1].split("%3D")[1];
  // const bar = urlstr.split("%26")[2].split("%3D")[1];
  // console.log(`thing: ${weight} and ${bar}`);

  // console.log(plates);
  const weight = "100";
  const bar = "20";
  const plates = splitPlates(weight, bar);
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
    </div>
  );
};
export default MathPage;
