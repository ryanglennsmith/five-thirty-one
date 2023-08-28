import { redirect } from "next/navigation";
import ButtonFrame from "./button";
const getIsLoggedIn = async (): Promise<boolean> => {
  const verifyUrl = process.env.VERIFY_URL || "";
  const data = await fetch(verifyUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const result = await data.json();
  return result.isLoggedIn;
};

export default async function Login() {
  const isLoggedIn = await getIsLoggedIn();
  //   if (isLoggedIn) {
  //     redirect("/five-thirty-one");
  //   } else {
  //     console.log("whut");
  //   }
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-24 flex flex-col items-center justify-center">
      <ButtonFrame btnType={"login"} btnText="henlo" marginTop="mt-80" />
    </div>
  );
}
