import Link from "next/link";
type Props = {
  lift: string;
  user: number;
  week: number;
  set3: number;
};
const RecordButton = ({ lift, user, week, set3 }: Props) => {
  const date = new Date();

  return (
    <Link
      href={`/five-thirty-one/add-record/${user}&${lift}=${set3}&date=${
        date.toISOString().split("T")[0]
      }&week=${week}`}
      className="flex flex-row justify-center align-middle"
    >
      &times;
    </Link>
  );
};

export default RecordButton;
