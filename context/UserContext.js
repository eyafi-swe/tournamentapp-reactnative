import React, { useEffect, useState, createContext } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/constants';

export const AuthContext = createContext();

const UserContext = ({ children }) => {

    GoogleSignin.configure({
        webClientId: '768863092248-rag9ib6fnqq981a6jur9f08cjk7i8ut5.apps.googleusercontent.com',
    });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [news, setNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(false);


    const signUpWithEmail = (email, password) => {
        return auth().createUserWithEmailAndPassword(email, password);
    }


    const signInWithEmail = (email, password) => {
        return auth().signInWithEmailAndPassword(email, password);
    }


    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }



    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    const updateUserInfo = async (price, deduct = true) => {


    }


    const updateAsyncStorage = async (data) => {
        let userInfo = await AsyncStorage.getItem('user')
        userInfo = JSON.parse(userInfo)
        // console.log(userInfo, 'user info')
        userInfo.wallet = parseInt(data)
        await AsyncStorage.setItem('user', JSON.stringify(userInfo))
    }

    const fetchUser = (email) => {
        fetch(`${BASE_URL}/users/${email}`)
            .then(res => res.json())
            .then(data => {
                AsyncStorage.setItem('user', JSON.stringify(data))
                // setUserInfo(data)
                console.log(data, 'user info')
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                console.log('finally')
            })
    }

    const fetchNews = () => {

    }

    if (initializing) return null;



    const logOut = async () => {
        try {
            console.log({ user });
            GoogleSignin.revokeAccess();
            auth().signOut();
            setUser(null);
        }
        catch (e) {
            console.log('hereee', e);
        }
    }

    const authInfo = { user, fetchNews, news, newsLoading, userInfo, updateUserInfo, fetchUser, setUserInfo, initializing, onGoogleButtonPress, signInWithEmail, signUpWithEmail, logOut, updateAsyncStorage };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;