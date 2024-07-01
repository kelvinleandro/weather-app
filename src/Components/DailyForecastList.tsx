import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DailyForecast } from "@/types/weatherApi";
import { getWeekday, isToday } from "@/utils";

type Props = {
  data: DailyForecast[] | undefined;
};

// const DailyForecastList = ({ data }: Props) => {
//   const renderItem = ({ item }: ListRenderItemInfo<DailyForecast>) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Text style={styles.text}>
//           {isToday(item.date) ? "Today" : getWeekday(item.date)}
//         </Text>
//         <View style={styles.humiditySection}>
//           <FontAwesome6
//             name="droplet"
//             size={14}
//             color="rgba(255,255,255,0.4)"
//           />
//           <Text style={styles.textHumidity}>{item.day.avghumidity}%</Text>
//           <Image
//             source={{ uri: "https:" + item.day.condition.icon }}
//             style={styles.weatherIcon}
//           />
//         </View>
//         <Text style={styles.textHumidity}>
//           {item.day.maxtemp_c}° / {item.day.mintemp_c}°
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       ListEmptyComponent={() => (
//         <Text style={styles.text}>Daily forecast unavailable</Text>
//       )}
//       showsVerticalScrollIndicator={false}
//     />
//   );
// };
const DailyForecastList = ({ data }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      {data && data.length > 0 ? (
        data.map((item) => (
          <View key={item.date} style={styles.itemContainer}>
            <Text style={styles.text}>
              {isToday(item.date) ? "Today" : getWeekday(item.date)}
            </Text>
            <View style={styles.humiditySection}>
              <FontAwesome6
                name="droplet"
                size={14}
                color="#cecece"
              />
              <Text style={styles.textHumidity}>{item.day.avghumidity}%</Text>
              <Image
                source={{ uri: "https:" + item.day.condition.icon }}
                style={styles.weatherIcon}
              />
            </View>
            <Text style={styles.textHumidity}>
              {item.day.maxtemp_c}° / {item.day.mintemp_c}°
            </Text>
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
  textHumidity: {
    color: "#cecece",
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
    gap: 2,
  },
});
