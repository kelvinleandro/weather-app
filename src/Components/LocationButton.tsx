import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
};

const LocationButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <BlurView style={styles.button} intensity={30}>
        <MaterialCommunityIcons name="map-marker" size={24} color="white" />
        <Text style={styles.text}>{title}</Text>
      </BlurView>
    </TouchableOpacity>
  );
};

export default LocationButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: 6,
    paddingHorizontal: 4,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});
