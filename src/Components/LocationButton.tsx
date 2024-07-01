import { StyleSheet, Text, View, TouchableOpacity,  } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'

type Props = {
  title: string;
  onPress: () => void;
}

const LocationButton = ({title, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialCommunityIcons name="map-marker" size={24} color="white" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default LocationButton

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    width: "100%",
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  }
})