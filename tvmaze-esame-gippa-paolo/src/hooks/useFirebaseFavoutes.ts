import { useEffect, useState } from "react";
import useFirebaseAuth from "./useFirebaseAuth";
import { get, getDatabase, ref, set } from "firebase/database";

const db = getDatabase();

const useFirebaseFavourites = (): [
  favourites: number[],
  addToFavourites: (showId: number) => void,
  removeFromFavourites: (showId: number) => void
] => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [user, isLoading] = useFirebaseAuth();

  useEffect(() => {
    // prendere i preferiti da firebase realtime db
    // lo user.id
    if (!!user)
      get(ref(db, "users/" + user.id + "/favourites")).then((snapshot) => {
        setFavourites(snapshot.val());
      });
  }, [user, isLoading]);

  const addToFavourites = (showId: number) => {
    // aggiorna stato locale con favourites.push()
    // aggiorna firebase su db
    // /users/${user.id}
    if (!!user) {
      const newFavourites = [...(favourites || []), showId];
      setFavourites(newFavourites);
      set(ref(db, "users/" + user.id + "/favourites"), newFavourites).catch((err) => {
        console.error(err);
      });
    }
  };

  const removeFromFavourites = (showId: number) => {
    // aggiorna stato locale
    // aggiorna firebase su db
    if (!!user) {
      const newFavourites = favourites.filter((fav) => fav !== showId); //.filter() metodo array Creates a new array with all array elements that passes a test.
      setFavourites(newFavourites);
      set(ref(db, "users/" + user.id + "/favourites"), newFavourites);
    }
  };

  return [favourites, addToFavourites, removeFromFavourites];
};

export default useFirebaseFavourites;
