import { useContext } from "react";
import { AppContext } from "../components/ContextProvider";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext is part of AppProvider");
  }
  return context;
};
