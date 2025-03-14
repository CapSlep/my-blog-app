import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";

const useUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), function (user) {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { isLoading, user };
};

export default useUser;
