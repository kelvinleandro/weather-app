import { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { City, Coordinate } from "@/types/geolocation";
import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
} from "expo-location";
import { fetchAutocomplete } from "@/api/weatherApi";

export interface LocationContextType {
  activeCoordinate: Coordinate | null;
  setActiveCoordinate: React.Dispatch<React.SetStateAction<Coordinate | null>>;
  userLocation: City | null;
  favoriteLocations: City[];
  toggleFavoriteLocation: (location: City) => void;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeCoordinate, setActiveCoordinate] = useState<Coordinate | null>(null);
  const [userLocation, setUserLocation] = useState<City | null>(null);
  const [favoriteLocations, setFavoriteLocations] = useState<City[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favoriteLocations");
        if (favorites) {
          setFavoriteLocations(JSON.parse(favorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from storage", error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const loadActiveLocation = async () => {
      const { status } = await getForegroundPermissionsAsync();
      // select the location to display when the app starts
      if (status === "granted") {
        const location = await getCurrentPositionAsync({});
        setActiveCoordinate({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
        const autocompleteResponse = await fetchAutocomplete(`${location.coords.latitude},${location.coords.longitude}`);
        setUserLocation({
          city: autocompleteResponse[0].name,
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        })
      } else if (favoriteLocations.length > 0) {
        setActiveCoordinate({
          lat: favoriteLocations[0].lat,
          lon: favoriteLocations[0].lon,
        });
      } else {
        // London as default
        setActiveCoordinate({ lat: 51.52, lon: -0.11 })
      }
    };
    loadActiveLocation();
  }, []);

  const toggleFavoriteLocation = async (location: City) => {
    let updatedFavorites;

    if (favoriteLocations.some((fav) => fav.city === location.city)) {
      // Remove from favorites
      updatedFavorites = favoriteLocations.filter(
        (fav) => fav.city !== location.city
      );
    } else {
      // Add to favorites
      updatedFavorites = [...favoriteLocations, location];
    }

    setFavoriteLocations(updatedFavorites);

    try {
      await AsyncStorage.setItem(
        "favoriteLocations",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to save favorites to storage", error);
    }
  };

  const value = {
    activeCoordinate,
    setActiveCoordinate,
    favoriteLocations,
    toggleFavoriteLocation,
    userLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
