import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import { DrawerRouteParamList } from "@/types/drawerRoute";
import { Coordinate } from "@/types/geolocation";
import { fetchForecast } from "@/api/weatherApi";
import { useLocation } from "@/hooks/useLocation";
import { ForecastResponse } from "@/types/weatherApi";

type Props = DrawerScreenProps<DrawerRouteParamList, "Home">;

const HomeScreen = ({ navigation, route }: Props) => {
  const headerHeight = useHeaderHeight();
  const { activeCoordinate } = useLocation();
  const [coordinate, setCoordinate] = useState<Coordinate | null>(
    route.params?.coordinate || null
  );
  const [weatherData, setWeatherData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!route.params?.coordinate) {
      setCoordinate(activeCoordinate);
    }
  }, [route.params?.coordinate, activeCoordinate]);

  useEffect(() => {
    if (coordinate) {
      const loadWeatherData = async () => {
        try {
          const response = await fetchForecast(coordinate.lat, coordinate.lon);
          setWeatherData(response);
          navigation.setOptions({ headerTitle: response.location.name });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      loadWeatherData();
    }
  }, [coordinate, navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingTop: headerHeight },
          ]}
        >
          <View style={styles.mainSection}>
            <View style={styles.currentInfo}>
              <Text style={[styles.textColor, styles.currentTemperature]}>{weatherData?.current.temp_c}°</Text>
              <Text style={[styles.textColor, styles.currentCondition]}>
                {weatherData?.current.condition.text}
              </Text>
              <Text style={[styles.textColor, styles.minMaxTempText]}>
                {weatherData?.forecast.forecastday[0].day.maxtemp_c}° /{" "}
                {weatherData?.forecast.forecastday[0].day.mintemp_c}° Feels like{" "}
                {weatherData?.current.feelslike_c}°
              </Text>
            </View>

            <LottieView
              autoPlay
              loop
              style={styles.animation}
              source={require("@/assets/day_sunny.json")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  textColor: {
    color: "white",
  },
  currentTemperature: {
    fontSize: 52,
    fontWeight: 800,
  },
  currentCondition: {
    fontSize: 24,
    fontWeight: 600,
  },
  minMaxTempText: {
    fontSize: 14,
    fontWeight: 400,
  },
  mainSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    width: "100%",
  },
  currentInfo: {
    flex: 1,
    gap: 4,
  },
  animation: {
    width: 200,
    height: 200,
  },
});
