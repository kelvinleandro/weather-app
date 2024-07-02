import { StyleSheet, Text, View } from 'react-native'
import useSettings from '@/hooks/useSettings'

const SettingsScreen = () => {
  const { settings, saveSettings } = useSettings();

  const handleValueChange = (field: string, value: string) => {
    const newSettings = { ...settings, [field]: value };
    saveSettings(newSettings);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SettingsScreen</Text>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303968",
    paddingHorizontal: 12,
    gap: 18,
  },
  text: {
    color: "#fff",
  }
})