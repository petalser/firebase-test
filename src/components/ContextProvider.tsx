import React, {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import Cookies from "universal-cookie";

const cookie = new Cookies();

interface Context {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  showInfo: boolean;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
}

interface AppProviderProps {
  children: ReactNode;
}

const initialContext: Context = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  showInfo: false,
  setShowInfo: () => {},
};

export const AppContext = createContext<Context>(initialContext);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!cookie.get("userToken"));
  }, [setIsLoggedIn]);

  return (
    <AppContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, showInfo, setShowInfo }}
    >
      {children}
    </AppContext.Provider>
  );
};
