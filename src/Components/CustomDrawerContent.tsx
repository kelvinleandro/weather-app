import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "@/hooks/useLocation";
import LocationButton from "./LocationButton";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const { userLocation, favoriteLocations } = useLocation();

  const handleLocationPress = (lat: number, lon: number) => {
    props.navigation.navigate("Home", { coordinate: { lat: lat, lon: lon } });
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        { paddingTop: top, paddingBottom: bottom },
      ]}
    >
      <View style={styles.screenNavigationContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Search")}>
          <Ionicons name="search-sharp" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-sharp" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {userLocation && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your location</Text>
          <LocationButton
            title={userLocation.city}
            onPress={() =>
              handleLocationPress(userLocation.lat, userLocation.lon)
            }
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorites Location</Text>
        {
          favoriteLocations.length > 0 ?
          favoriteLocations.map((item, index) => (
            <LocationButton key={index} title={item.city} onPress={handleLocationPress.bind(this, item.lat, item.lon)} />
          )) :
          <Text style={{color: "white"}}>You don't have any favorite locations saved</Text>
        }
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5597e4",
    gap: 12,
  },
  screenNavigationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    marginRight: 18,
    marginTop: 12,
  },
  sectionTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  section: {
    marginHorizontal: 18,
    gap: 4,
  }
});
