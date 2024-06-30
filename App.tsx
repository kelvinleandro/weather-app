import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { LocationContextProvider } from "@/context/LocationContext";
import * as Location from "expo-location";
import DrawerRoute from "@/routes/drawer.route";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  return (
    <LocationContextProvider>
      <NavigationContainer>
        <DrawerRoute />
      </NavigationContainer>
    </LocationContextProvider>
  );
}
