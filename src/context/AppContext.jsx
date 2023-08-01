import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <AppContext.Provider value={{ activeComponent, setActiveComponent }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
