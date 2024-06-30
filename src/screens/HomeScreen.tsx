import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";

import { DrawerRouteParamList } from "@/types/drawerRoute";
import { Coordinate } from "@/types/location";
import { fetchForecast } from "@/api/weatherApi";
import { useLocation } from "@/hooks/useLocation";

type Props = DrawerScreenProps<DrawerRouteParamList, "Home">;

const HomeScreen = ({ navigation, route }: Props) => {
  const { activeCoordinate } = useLocation();
  const [coordinate, setCoordinate] = useState<Coordinate | null>(
    route.params?.coordinate || null
  );
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    if (!route.params?.coordinate) {
      setCoordinate(activeCoordinate);
    }
  }, []);

  useEffect(() => {
    if (coordinate) {
      const loadWeatherData = async () => {
        try {
          const response = await fetchForecast(coordinate.lat, coordinate.lon);
          setWeatherData(response);
        } catch (error) {
          console.log(error);
        }
      };
      loadWeatherData();
    }
  }, [coordinate]);

  if (!coordinate) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={
        weatherData?.current?.is_day === 1
          ? ["#5597e4", "#7cb0d3"]
          : ["#303968", "#525E96"]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.text}>Home screen</Text>
      {weatherData && (
        <Text style={styles.text}>{weatherData.location?.name}</Text>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
