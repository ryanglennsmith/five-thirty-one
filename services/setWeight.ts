import { MyNumbers } from "@prisma/client";
import prisma from "./prisma";

const setWeight = async (
  weight: number,
  lift: string,
  id: number
): Promise<MyNumbers> => {
  lift = lift.toUpperCase();
  const weights = await prisma.myNumbers.update({
    where: { NumbersId: id },
    data: { [lift]: weight },
  });
  return weights;
};
export default setWeight;
