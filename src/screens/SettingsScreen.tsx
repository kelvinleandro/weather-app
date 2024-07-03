import { ScrollView, StyleSheet, Text, View } from "react-native";
import useSettings from "@/hooks/useSettings";
import { useHeaderHeight } from "@react-navigation/elements";
import { Picker } from "@react-native-picker/picker";

const SettingsScreen = () => {
  const headerHeight = useHeaderHeight();
  const { settings, saveSettings } = useSettings();

  const handleValueChange = (field: keyof typeof settings, value: string) => {
    const newSettings = { ...settings, [field]: value };
    saveSettings(newSettings);
  };

  const pickerSettings = {
    mode: "dropdown" as const,
    dropdownIconColor: "#fff",
  };

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview}
      >
        <View style={styles.setting}>
          <Text style={styles.labelText}>Temperature Unit</Text>
          <Picker
            selectedValue={settings.temperatureUnit}
            onValueChange={(value) =>
              handleValueChange("temperatureUnit", value)
            }
            style={styles.picker}
            {...pickerSettings}
            >
            <Picker.Item label="°C" value="celsius"/>
            <Picker.Item label="°F" value="fahrenheit"/>
          </Picker>
        </View>

        <View style={styles.setting}>
          <Text style={styles.labelText}>Wind Unit</Text>
          <Picker
            selectedValue={settings.windUnit}
            onValueChange={(value) => handleValueChange("windUnit", value)}
            style={styles.picker}
            {...pickerSettings}
            >
            <Picker.Item label="km/h" value="km/h"/>
            <Picker.Item label="mph" value="mph"/>
          </Picker>
        </View>

        <View style={styles.setting}>
          <Text style={styles.labelText}>Pressure Unit</Text>
          <Picker
            selectedValue={settings.pressureUnit}
            onValueChange={(value) => handleValueChange("pressureUnit", value)}
            style={styles.picker}
            {...pickerSettings}
            >
            <Picker.Item label="Millibars" value="mb"/>
            <Picker.Item label="Inches" value="in"/>
          </Picker>
        </View>

        <View style={styles.setting}>
          <Text style={styles.labelText}>Precipitation Unit</Text>
          <Picker
            selectedValue={settings.precipitationUnit}
            onValueChange={(value) =>
              handleValueChange("precipitationUnit", value)
            }
            style={styles.picker}
            {...pickerSettings}
            >
            <Picker.Item label="Millimeters" value="mm" />
            <Picker.Item label="Inches" value="in" />
          </Picker>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303968",
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  scrollview: {
    flex: 1,
    gap: 18,
  },
  labelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  picker: {
    backgroundColor: "transparent",
    flex: 1,
    color: "#fff",
  },
});
