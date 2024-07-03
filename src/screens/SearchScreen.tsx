import { StyleSheet, TextInput, View } from "react-native";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerRouteParamList } from "@/types/drawerRoute";
import { fetchAutocomplete } from "@/api/weatherApi";
import { AutoCompleteResponse } from "@/types/weatherApi";
import LocationButton from "@/components/LocationButton";

type Props = DrawerScreenProps<DrawerRouteParamList, "Search">;

const SearchScreen = ({ navigation, route }: Props) => {
  const headerHeight = useHeaderHeight();
  const [input, setInput] = useState("");
  const [autocompleteResult, setAutocompleteResult] =
    useState<AutoCompleteResponse>([]);

  const handleLocationPress = (lat: number, lon: number) => {
    navigation.navigate("Home", { coordinate: { lat: lat, lon: lon } });
  };

  const handleTextChange = async (text: string) => {
    setInput(text);
    if (input.length > 2) {
      const response = await fetchAutocomplete(text);
      setAutocompleteResult(response);
    } else {
      setAutocompleteResult([]);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <BlurView intensity={50} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          placeholderTextColor="#fff"
          value={input}
          onChangeText={(text) => handleTextChange(text)}
        />
        <Ionicons name="search" size={24} color="white" style={styles.icon} />
      </BlurView>

      {autocompleteResult.map((item, index) => (
        <LocationButton
          key={index}
          title={`${item.name}, ${item.country}`}
          onPress={handleLocationPress.bind(this, item.lat, item.lon)}
        />
      ))}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303968",
    paddingHorizontal: 12,
    gap: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});
