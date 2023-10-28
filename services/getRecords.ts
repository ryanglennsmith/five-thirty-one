import { Records } from "@prisma/client";
import prisma from "./prisma";

const getRecordsForUser = async (userId: number): Promise<Records[]> => {
  const records = await prisma.records.findMany({
    where: { UserId: userId },
    orderBy: { Date: "desc" },
  });
  return records;
};
export default getRecordsForUser;
