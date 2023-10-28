import { Records } from "@prisma/client";
import prisma from "./prisma";

const setRecord = async (commit: {
  userId: number;
  lift: string;
  set3: number;
  date: string;
  set3Reps: number;
  comments: string;
  weekOfCycle: number;
}): Promise<Records> => {
  commit.lift = commit.lift.toUpperCase();
  const record = await prisma.records.create({
    data: {
      UserId: commit.userId,
      Lift: commit.lift,
      Weight: commit.set3,
      Date: commit.date,
      Set_3_Reps: commit.set3Reps,
      Comments: commit.comments,
      Week_Of_Cycle: commit.weekOfCycle,
    },
  });
  return record;
};
export default setRecord;
