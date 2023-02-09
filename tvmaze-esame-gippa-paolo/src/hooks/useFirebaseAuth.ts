import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { auth } from "../firebase-config";

const provider = new GoogleAuthProvider();

type UserType = {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
} | null;

const useFirebaseAuth = (): [user: UserType, isLoading: boolean, logout: () => void, signInWithGoogle: () => void] => {
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
  }, []);

  useEffect(() => {
    // questo crea un listener al Mount del componente
    const unlisten = auth.onAuthStateChanged((res) =>
      res
        ? setUser({
            id: res.uid,
            name: res.displayName || "",
            email: res.email || "",
            profilePic: res.photoURL || undefined,
          })
        : setUser(null)
    );
    return () => {
      // questo elimina il listener all'unmount del componente
      unlisten();
    };
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const id = user.uid;
        const name = user.displayName;
        const email = user.email;
        const profilePic = user.photoURL;

        if (!!name && !!email) {
          // utente corretto
          setUser({
            id: id,
            name: name,
            email: email,
            profilePic: profilePic || undefined,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return [user, isLoading, logout, signInWithGoogle];
};

export default useFirebaseAuth;
