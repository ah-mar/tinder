import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user1, setUser1] = useState(null);

  // just subscribe authListener once and it will call the callback everytime the auth is changed, setState , rerender the AuthProvider Compoenent but not useEffect again. Chance of getting in infinite loop here.
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        setUser1(user);
      } else {
        setUser1(user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user1 }}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, AuthContext };
export default useAuth;

//Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.
