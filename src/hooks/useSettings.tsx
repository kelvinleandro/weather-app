import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsType } from "@/types/settings";

const useSettings = () => {
  const [settings, setSettings] = useState<SettingsType>({
    temperatureUnit: "celsius",
    windUnit: "km/h",
    pressureUnit: "mb",
    precipitationUnit: "mm",
  });

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await AsyncStorage.getItem("settings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async (newSettings: SettingsType) => {
    setSettings(newSettings);
    await AsyncStorage.setItem("settings", JSON.stringify(newSettings));
  };

  return { settings, saveSettings };
};

export default useSettings;
