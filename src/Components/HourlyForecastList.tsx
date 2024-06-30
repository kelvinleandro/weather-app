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
        <Text style={styles.textColor}>{time}</Text>
        <Image source={{ uri: "https:" + item.condition.icon }} style={styles.icon} />
        <Text style={styles.textColor}>{item.temp_c}°</Text>
        <Text style={styles.textColor}>{item.humidity}%</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal={true}
      ListEmptyComponent={() => <Text style={styles.textColor}>No hourly forecast available</Text>}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default HourlyForecastList;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
  },
  textColor: {
    color: "white",
  },
  icon: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
});
