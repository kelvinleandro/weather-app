import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useMemo } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Octicons from "@expo/vector-icons/Octicons";
import LottieView from "lottie-react-native";

import { DrawerRouteParamList } from "@/types/drawerRoute";
import { Coordinate } from "@/types/geolocation";
import { fetchForecast } from "@/api/weatherApi";
import { useLocation } from "@/hooks/useLocation";
import { ForecastResponse } from "@/types/weatherApi";
import HourlyForecastList from "@/components/HourlyForecastList";
import DailyForecastList from "@/components/DailyForecastList";
import Loader from "@/components/Loader";
import useSettings from "@/hooks/useSettings";
import { getWeatherAnimation } from "@/utils/weatherAnimations";

type Props = DrawerScreenProps<DrawerRouteParamList, "Home">;

const HomeScreen = ({ navigation, route }: Props) => {
  const headerHeight = useHeaderHeight();
  const { settings } = useSettings();
  const {
    activeCoordinate: coordinate,
    setActiveCoordinate,
    favoriteLocations,
    toggleFavoriteLocation,
  } = useLocation();
  // const [coordinate, setCoordinate] = useState<Coordinate | null>(
  //   route.params?.coordinate || null
  // );
  const [weatherData, setWeatherData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const moreWeatherInfo = useMemo(() => {
    return {
      Wind: `${
        settings.windUnit === "mph"
          ? weatherData?.current.wind_mph ?? "N/A"
          : weatherData?.current.wind_kph ?? "N/A"
      } ${settings.windUnit}`,
      Pressure: `${
        settings.pressureUnit === "in"
          ? weatherData?.current.pressure_in ?? "N/A"
          : weatherData?.current.pressure_mb ?? "N/A"
      } ${settings.pressureUnit}`,
      Precipitation: `${
        settings.precipitationUnit === "in"
          ? weatherData?.current.precip_in ?? "N/A"
          : weatherData?.current.precip_mm ?? "N/A"
      } ${settings.precipitationUnit}`,
      Humidity: `${weatherData?.current.humidity ?? "N/A"} %`,
      "Dew Point": `${
        settings.temperatureUnit === "fahrenheit"
          ? weatherData?.current.dewpoint_f ?? "N/A"
          : weatherData?.current.dewpoint_c ?? "N/A"
      }°`,
      "UV Index": `${weatherData?.current.uv ?? "N/A"}`,
    };
  }, [weatherData, settings]);

  useEffect(() => {
    if (route.params?.coordinate) {
      setActiveCoordinate(route.params.coordinate);
    }
    // if (!route.params?.coordinate) {
    //   setCoordinate(activeCoordinate);
    // }
  }, [route.params?.coordinate, coordinate]);

  useEffect(() => {
    if (coordinate) {
      const loadWeatherData = async () => {
        try {
          const response = await fetchForecast(coordinate.lat, coordinate.lon);
          setWeatherData(response);
          navigation.setOptions({
            headerTitle: response.location.name,
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      loadWeatherData();
    }
  }, [coordinate, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (!weatherData) return;
        return (
          <TouchableOpacity
            onPress={() =>
              toggleFavoriteLocation({
                city: weatherData.location.name,
                lat: weatherData.location.lat,
                lon: weatherData.location.lon,
              })
            }
            style={{ marginRight: 12 }}
          >
            <Octicons
              name={
                favoriteLocations.some(
                  (fav) => fav.city === weatherData.location.name
                )
                  ? "star-fill"
                  : "star"
              }
              size={24}
              color="#ffc82e"
            />
          </TouchableOpacity>
        );
      },
    });
  }, [weatherData, navigation, favoriteLocations, toggleFavoriteLocation]);

  if (loading) {
    return <Loader />;
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
      <View style={[styles.safeArea, { paddingTop: headerHeight }]}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainSection}>
            <View style={styles.currentInfo}>
              <Text style={[styles.textColor, styles.currentTemperature]}>
                {settings.temperatureUnit === "fahrenheit"
                  ? weatherData?.current.temp_f
                  : weatherData?.current.temp_c}
                °
              </Text>
              <Text style={[styles.textColor, styles.currentCondition]}>
                {weatherData?.current.condition.text}
              </Text>
              <Text style={[styles.textColor, styles.minMaxTempText]}>
                {settings.temperatureUnit === "fahrenheit"
                  ? `${weatherData?.forecast.forecastday[0].day.maxtemp_f}° / ${weatherData?.forecast.forecastday[0].day.mintemp_f}°`
                  : `${weatherData?.forecast.forecastday[0].day.maxtemp_c}° / ${weatherData?.forecast.forecastday[0].day.mintemp_c}°`}{" "}
                Feels like{" "}
                {settings.temperatureUnit === "fahrenheit"
                  ? weatherData?.current.feelslike_f
                  : weatherData?.current.feelslike_c}
                °
              </Text>
            </View>
            <LottieView
              autoPlay
              loop
              style={styles.animation}
              source={getWeatherAnimation(weatherData?.current.condition.code as number, weatherData?.current.is_day as number)}
            />
          </View>

          <BlurView style={styles.blurContainer} intensity={30}>
            <Text style={[styles.textColor, styles.blurContainerTitle]}>
              Hourly Forecast
            </Text>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#cecece",
              }}
            ></View>
            <HourlyForecastList
              data={weatherData?.forecast.forecastday[0].hour}
            />
          </BlurView>

          <BlurView style={styles.blurContainer} intensity={30}>
            <Text style={[styles.textColor, styles.blurContainerTitle]}>
              5-days Forecast
            </Text>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#cecece",
              }}
            ></View>
            <DailyForecastList data={weatherData?.forecast.forecastday} />
          </BlurView>

          <View style={styles.grid}>
            {Object.entries(moreWeatherInfo).map(([field, value], index) => (
              <BlurView intensity={30} key={index} style={styles.item}>
                <Text style={styles.gridItemFieldText}>{field}</Text>
                <Text style={styles.gridItemValueText}>{value}</Text>
              </BlurView>
            ))}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#303968",
  },
  safeArea: {
    flex: 1,
    paddingBottom: 24,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 12,
    gap: 18,
  },
  textColor: {
    color: "white",
  },
  currentTemperature: {
    fontSize: 48,
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
  blurContainerTitle: {
    fontWeight: 600,
    fontSize: 18,
  },
  blurContainer: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    paddingHorizontal: 18,
    paddingVertical: 12,
    gap: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  item: {
    width: "48%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  gridItemFieldText: {
    color: "white",
    fontWeight: "500",
  },
  gridItemValueText: {
    color: "white",
    fontWeight: "800",
    fontSize: 24,
  },
});
