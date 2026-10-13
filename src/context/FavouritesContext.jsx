import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const [favouriteIds, setFavouriteIds] = useLocalStorage("favourites", []);

  function isFavourite(id) {
    return favouriteIds.includes(id);
  }

  function toggleFavourite(id) {
    setFavouriteIds((current) =>
      current.includes(id) ? current.filter((favId) => favId !== id) : [...current, id]
    );
  }

  return (
    <FavouritesContext.Provider value={{ favouriteIds, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
