import { User } from "@prisma/client";
import prisma from "./prisma";

const getUser = async (userName: string): Promise<User> => {
  const user = await prisma.user.findFirst({ where: { Name: userName } });
  console.log(user);
  return user!;
};
export default getUser;
