import { MyNumbers } from "@prisma/client";
import prisma from "./prisma";

// export default async function getWeights() {
//   const weights = await prisma.myNumbers.findMany({ where: { UserId: 1 } });
//   console.log(weights);
//   return weights;
// }

const getWeights = async (id: number): Promise<MyNumbers> => {
  const weights = await prisma.myNumbers.findFirst({ where: { UserId: id } });
  console.log(weights);
  return weights!;
};
export default getWeights;
