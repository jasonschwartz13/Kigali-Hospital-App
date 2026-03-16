import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext(null);
const STORAGE_KEY = '@hospital_app_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedFavorites !== null) {
          setFavorites(JSON.parse(storedFavorites)); 
        }
      } catch (e) {
        console.error("Failed to load favorites from storage", e);
      }
    };

    loadFavorites();
  }, []);

  const toggleFavorite = async (guideline) => {
    try {
      let newFavorites;
      const exists = favorites.find(item => item.route === guideline.route);
      
      if (exists) {
        newFavorites = favorites.filter(item => item.route !== guideline.route);
      } else {
        newFavorites = [...favorites, guideline];
      }
      
      setFavorites(newFavorites);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));

    } catch (e) {
      console.error("Failed to save favorite to storage", e);
    }
  };

  const isFavorite = (route) => {
    return favorites.some(item => item.route === route);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);