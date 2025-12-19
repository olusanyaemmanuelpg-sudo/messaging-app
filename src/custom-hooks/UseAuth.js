import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import { useNavigate } from "react-router";

export const UseAuth = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const idTokenResult = await user.getIdTokenResult(true);
       if (idTokenResult.claims.admin) {
        navigate('/admin-page')
       } 
      } else {
        setUser(null);
        navigate('/login')
      }
    });

    return unsubscribe;
  }, []);

  return user;
}

export default UseAuth