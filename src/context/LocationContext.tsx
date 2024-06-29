import { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Location } from "types/location";

export interface LocationContextType {
  activeLocation: Location | null;
  setActiveLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  favoritesLocation: Location[];
  toggleFavoriteLocation: (location: Location) => void;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [favoritesLocation, setFavoritesLocation] = useState<Location[]>([]);

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

  const toggleFavoriteLocation = async (location: Location) => {
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
    activeLocation,
    setActiveLocation,
    favoritesLocation,
    toggleFavoriteLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
