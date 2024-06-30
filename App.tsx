import "react-native-gesture-handler";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { LocationContextProvider } from "@/context/LocationContext";
import DrawerRoute from "@/routes/drawer.route";

export default function App() {
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  return (
    <LocationContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <DrawerRoute />
        </NavigationContainer>
      </SafeAreaProvider>
    </LocationContextProvider>
  );
}
