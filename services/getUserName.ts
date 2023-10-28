import { User } from "@prisma/client";
import prisma from "./prisma";

const getUser = async (userId: number): Promise<User> => {
  const user = await prisma.user.findFirst({ where: { ID: userId } });
  console.log(user);
  return user!;
};
export default getUser;
