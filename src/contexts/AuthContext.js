import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

//create context
const AuthContext = React.createContext()

//create function to use the context
export function useAuth() {
    return useContext(AuthContext)
}

//create function provider
export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    /* 
        onAuthStateChanged used to notify whenever user get set, and it only run once so use hook useEffect
        onAuthStatechanged return method
        firebase actually sets localstorage, set tokens for you so it'll use this on off state changes        
    */
    useEffect(() => {    
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser, 
        signup, 
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
           {!loading && children}
        </AuthContext.Provider>
    )
}
