import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerRouteParamList } from "types/drawerRoute";
import { Location } from "types/location";
import { fetchForecast } from "api/weatherApi";

type Props = DrawerScreenProps<DrawerRouteParamList, "Home">;

const HomeScreen = ({ navigation, route }: Props) => {
  const [location, setLocation] = useState<Location | null>(
    route.params?.location || null
  );
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    if (!location) {
      const defaultLocation = { city: "London", lat: 51.52, lon: -0.11 };
      setLocation(defaultLocation);
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      const loadWeatherData = async () => {
        try {
          const response = await fetchForecast(location.lat, location.lon);
          setWeatherData(response);
        } catch (error) {
          console.log(error);
        }
      };
      loadWeatherData();
    }
  }, [location]);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{location.city}</Text>
      {weatherData && <Text>{weatherData?.country}</Text>}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
