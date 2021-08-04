import React, { useContext, useEffect, useState } from 'react'
import { auth, provider } from '../firebase/firebase'

const AuthContext = React.createContext<string>("no")

export function AuthProvider({ children }: any) {
    const [currentUser, setcurrentUser] = useState<any>()
    const [loading, setLoading] = useState(true)
    
    function login() {
        return auth.signInWithPopup(provider)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login
    }

    return (
        <AuthContext.Provider value={"hello"}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);