import ButtonFrame from "../_components/button";
type Props = {};
const FiveThirtyOne = ({}: Props) => {
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
      <ButtonFrame btnType={"531"} btnText="531" marginTop="mt-40" />
      <div className="text-xl">some more text</div>
      <div className="flex flex-row">
        <ButtonFrame btnType={"getWeights"} btnText="get weights" />
        <ButtonFrame btnType={"enterNewMax"} btnText={"enter new max"} />
      </div>
    </div>
  );
};

export default FiveThirtyOne;
