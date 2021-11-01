import { useEffect, useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,getIdToken } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication()
const useFirebase = () => {
    const [user, setUser] = useState({});


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInGoogle = () => {
       return signInWithPopup(auth, googleProvider)

    }

    const logOut = () => {
        signOut(auth).then(() => {
            setUser({})
        })
    }

    // observe whether user auth state changed or not
    useEffect(() => {
      const unsubscribe=  onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                .then(idToken=> localStorage.setItem('idToken',idToken))
                setUser(user)
            }
        });
        return ()=> unsubscribe;
    }, [])


    return {
        user,
        signInGoogle,
        logOut,
    }
}


export default useFirebase;