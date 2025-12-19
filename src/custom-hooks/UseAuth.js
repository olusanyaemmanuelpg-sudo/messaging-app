import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import { useNavigate, useLocation } from "react-router";

export const UseAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const idTokenResult = await user.getIdTokenResult(true);
        const isAdmin = !!idTokenResult.claims.admin;

        // ONLY navigate if we are not already where we should be
        if (isAdmin && location.pathname !== '/admin-page') {
          navigate('/admin-page');
        } else if (!isAdmin && location.pathname !== '/chat') {
          navigate('/chat');
        }
      } else {
        setUser(null);
        // Only redirect to login if we aren't already there (prevents loops)
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate('/login');
        }
      }
    });

    return unsubscribe;
  }, [navigate, location.pathname]);

  return user;
}

export default UseAuth