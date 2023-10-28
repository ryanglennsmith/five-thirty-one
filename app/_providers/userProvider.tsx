"use client";
import { ILifts } from "@/types/ILifts";
import { IRecord } from "@/types/IRecord";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type User = {
  userId: number;
  name: string;
  history: IRecord[];
  myNumbers: ILifts;
};
interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}
type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextProps>({
  user: {
    userId: 0,
    name: "",
    history: [],
    myNumbers: {
      dl: 0,
      sq: 0,
      bp: 0,
      ohp: 0,
    },
  },
  setUser: () => {},
});

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({
    userId: 0,
    name: "",
    history: [],
    myNumbers: {
      dl: 0,
      sq: 0,
      bp: 0,
      ohp: 0,
    },
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
