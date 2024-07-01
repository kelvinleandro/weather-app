import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { HourlyForecast } from "@/types/weatherApi";
import { FlatList } from "react-native-gesture-handler";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  data: HourlyForecast[] | undefined;
};

const HourlyForecastList = ({ data }: Props) => {
  const renderItem = ({ item }: ListRenderItemInfo<HourlyForecast>) => {
    const date = new Date(item.time);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textLight}>{time}</Text>
        <Image
          source={{ uri: "https:" + item.condition.icon }}
          style={styles.weatherIcon}
        />
        <Text style={styles.textBold}>{item.temp_c}°</Text>
        <View style={styles.humiditySection}>
          <FontAwesome6
            name="droplet"
            size={14}
            color="#cecece"
          />
          <Text style={styles.textLight}>{item.humidity}%</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal={true}
      ListEmptyComponent={() => (
        <Text style={styles.textBold}>Hourly forecast unavailable</Text>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default HourlyForecastList;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    gap: 4,
  },
  textBold: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  textLight: {
    color: "white",
    fontWeight: "400",
  },
  weatherIcon: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  humiditySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
