import { Image, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DailyForecast } from "@/types/weatherApi";
import { getWeekday, isToday } from "@/utils/datetime";
import useSettings from "@/hooks/useSettings";

type Props = {
  data: DailyForecast[] | undefined;
};

const DailyForecastList = ({ data }: Props) => {
  const { settings } = useSettings();
  return (
    <View style={{ flex: 1 }}>
      {data && data.length > 0 ? (
        data.map((item) => (
          <View key={item.date} style={styles.itemContainer}>
            <Text style={[styles.text, { flex: 1 }]}>
              {isToday(item.date) ? "Today" : getWeekday(item.date)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 2,
              }}
            >
              <View style={styles.humiditySection}>
                <FontAwesome6 name="droplet" size={14} color="#cecece" />
                <Text style={styles.textLight}>{item.day.avghumidity}%</Text>
                <Image
                  source={{ uri: "https:" + item.day.condition.icon }}
                  style={styles.weatherIcon}
                />
              </View>
              <Text style={styles.textLight}>
                {settings.temperatureUnit === "fahrenheit"
                  ? `${item.day.maxtemp_f}° / ${item.day.mintemp_f}°`
                  : `${item.day.maxtemp_c}° / ${item.day.maxtemp_c}°`}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.text}>Daily forecast unavailable</Text>
      )}
    </View>
  );
};

export default DailyForecastList;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  text: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  textLight: {
    color: "white",
    fontWeight: "400",
  },
  weatherIcon: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },
  humiditySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
  },
});
