import { useContext, useEffect } from "react";
import { FavouritesContext } from "../contexts/favourites.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../contexts/authentication.context";
const useFavourites = () => {
  const { user, isLoading } = useContext(AuthenticationContext);
  const {
    favouritesState: { favourites },
    favouritesDispatch,
  } = useContext(FavouritesContext);

  // Function to load favourites from storage
  const loadFavourites = async () => {
    if (user && user.uid) {
      const value = await AsyncStorage.getItem(`@favourites-${user.uid}`);
      if (value !== null) {
        favouritesDispatch({
          type: "LOAD_FAVOURITES",
          payload: JSON.parse(value),
        });
      }
    }
  };

  useEffect(() => {
    loadFavourites();
  }, [user, isLoading]);

  useEffect(() => {
    if (user && user.uid && favourites.length) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites]);

  const addFavourite = (movie) => {
    favouritesDispatch({ type: "ADD_FAVOURITE", payload: movie });
  };

  const removeFavourite = (movie) => {
    favouritesDispatch({ type: "REMOVE_FAVOURITE", payload: movie });
  };

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };
  return {
    favourites,
    addFavourite,
    removeFavourite,
  };
};

export default useFavourites;
