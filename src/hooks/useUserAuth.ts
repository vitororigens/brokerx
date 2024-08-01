import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { handleRequestUserPermission } from "../services/notification";

export function useUserAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const handleUserAuth = async (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        await handleRequestUserPermission(user.uid);
      }
    };
    const subscriber = auth().onAuthStateChanged(async (authUser) => {
      setUser(authUser);
      await handleUserAuth(authUser);
    });
    return () => subscriber();
  }, []);

  return user;
}
