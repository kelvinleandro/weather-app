import { LocationContext, LocationContextType } from "context/LocationContext";
import { useContext } from "react";

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocation must be used within a LocationContextProvider"
    );
  }
  return context;
};
