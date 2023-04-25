import React, { useEffect, useState, useContext, createContext } from 'react';
import { useSegments, useRouter } from 'expo-router';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const useProtectedRoute = (user) => {
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)'

        if(!user && !inAuthGroup) {
            router.replace('/auth')
        } else if(user && inAuthGroup) {
            router.replace('/')
        }

    }, [user, segments])
};

export const Provider = (props) => {
    const [user, setUser] = useState({ token: 'test' })
    useProtectedRoute(user)

    return(
        <AuthContext.Provider value={{}}>
            {props.children}
        </AuthContext.Provider>
    )
};