import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { LocationContextProvider } from "context/LocationContext";
import DrawerRoute from "routes/drawer.route";

export default function App() {
  return (
    <LocationContextProvider>
      <NavigationContainer>
        <DrawerRoute />
      </NavigationContainer>
    </LocationContextProvider>
  );
}
