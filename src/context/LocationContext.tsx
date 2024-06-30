import { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { City, Coordinate } from "@/types/geolocation";
import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
} from "expo-location";

export interface LocationContextType {
  activeCoordinate: Coordinate | null;
  setActiveCoordinate: React.Dispatch<React.SetStateAction<Coordinate | null>>;
  favoritesLocation: City[];
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
  const [favoritesLocation, setFavoritesLocation] = useState<City[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem("favoritesLocation");
        if (favorites) {
          setFavoritesLocation(JSON.parse(favorites));
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
      if (status === "granted") {
        const location = await getCurrentPositionAsync({});
        setActiveCoordinate({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      } else if (favoritesLocation.length > 0) {
        setActiveCoordinate({
          lat: favoritesLocation[0].lat,
          lon: favoritesLocation[0].lon,
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

    if (favoritesLocation.some((fav) => fav.city === location.city)) {
      // Remove from favorites
      updatedFavorites = favoritesLocation.filter(
        (fav) => fav.city !== location.city
      );
    } else {
      // Add to favorites
      updatedFavorites = [...favoritesLocation, location];
    }

    setFavoritesLocation(updatedFavorites);

    try {
      await AsyncStorage.setItem(
        "favoritesLocation",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to save favorites to storage", error);
    }
  };

  const value = {
    activeCoordinate,
    setActiveCoordinate,
    favoritesLocation,
    toggleFavoriteLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
