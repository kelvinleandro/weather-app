import { ScrollView, StyleSheet, Text, View } from 'react-native'
import useSettings from '@/hooks/useSettings'
import { useHeaderHeight } from '@react-navigation/elements';

const SettingsScreen = () => {
  const headerHeight = useHeaderHeight();
  const { settings, saveSettings } = useSettings();

  const handleValueChange = (field: string, value: string) => {
    const newSettings = { ...settings, [field]: value };
    saveSettings(newSettings);
  };

  return (
    <View style={[styles.container, {paddingTop: headerHeight}]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollview}>
        <Text style={styles.text}>SettingsScreen</Text>
      </ScrollView>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303968",
    paddingHorizontal: 12,
  },
  scrollview: {
    flex: 1,
  },
  text: {
    color: "#fff",
  }
})