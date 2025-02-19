import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";

// Create the context
export const AppContext = createContext();

// Define the context provider
const AppContextProvider = (props) => {
  const currencySymbol = '$'
  const value = {
    doctors, currencySymbol// Passing the doctors data into context
  };

  return (
    // Provide the context to children components
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
