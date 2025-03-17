import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";

/**
 * custom hook to get user data from firebase and loading status
 * @returns isLoading - boolean to check if user data is loading, user - user data from firebase or null if user not loged in
 */
const useUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); //state to check if data is loaded
  const [user, setUser] = useState<User | null>(null); //state for user that also can be null if user not loged in

  useEffect(() => {
    //runing onAuthStateChanged and passing getAuth function and callback function that will set user and loading status if successfull
    const unsubscribe = onAuthStateChanged(getAuth(), function (user) {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe; //runing unsubscribe after useEffect hook body finished to prevent memory leak caused by onAuthStateChanged firebase function
  }, []);

  return { isLoading, user }; //returning properties of useUser hook to use elsewhere
};

export default useUser;
