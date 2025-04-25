import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleGoogleSignUp = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (updatedData) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, updatedData).then(() => {
                setUser({ ...auth.currentUser, ...updatedData });
            });
        } else {
            return;
        }
    };

    const authInfo = {
        user,
        setUser,
        createNewUser,
        updateUserProfile,
        logOut,
        userLogin,
        loading,
        handleGoogleSignUp,
        setLoading,
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('state captured', currentUser?.email);
            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post('https://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log('login token', res.data);
                        setLoading(false);
                    })
            }
            else {
                axios.post('https://localhost:5000/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('logout', res.data);
                        setLoading(false);
                    })
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;