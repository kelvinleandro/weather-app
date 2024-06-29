import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LocationContextProvider } from 'context/LocationContext';

export default function App() {
  return (
    <LocationContextProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Text>Hello World!</Text>
        </View>
      </NavigationContainer>
    </LocationContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
