import { MyNumbers } from "@prisma/client";
import prisma from "./prisma";

const setWeight = async (commit: {
  lift: string;
  weight: number;
  id: number;
}): Promise<MyNumbers> => {
  commit.lift = commit.lift.toUpperCase();
  const weights = await prisma.myNumbers.update({
    where: { NumbersId: commit.id },
    data: { [commit.lift]: commit.weight },
  });
  return weights;
};
export default setWeight;
