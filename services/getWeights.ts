import { MyNumbers } from "@prisma/client";
import prisma from "./prisma";

const getWeights = async (id: number): Promise<MyNumbers> => {
  const weights = await prisma.myNumbers.findFirst({ where: { UserId: id } });
  console.log(weights);
  return weights!;
};
export default getWeights;
