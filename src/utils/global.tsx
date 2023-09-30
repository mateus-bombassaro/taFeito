import { createContext, useContext } from "react";

export type GlobalContent = {
  isEditingTask: boolean;
  setIsEditingTask: (c: boolean) => void;
  selectedTaskInput: string|null;
  setSelectedTaskInput: (c: string | null) => void;
  refetchTaskStatus: number;
  setRefectchTaskStatus: (c:number) => void
};

export const MyGlobalContext = createContext<GlobalContent>({
  isEditingTask: false, // set a default value
  setIsEditingTask: () => {},
  selectedTaskInput: null,
  setSelectedTaskInput: () => {},
  refetchTaskStatus: 0,
  setRefectchTaskStatus: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);