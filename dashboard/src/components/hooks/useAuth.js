import React, { useContext, useEffect, useState } from 'react'
import { auth, db, facebookAuth, googleAuth } from '../Provider/SetupFirebase.js'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        return auth.onAuthStateChanged(user => {
            setUser(user)
            setLoading(false)
        })
    }, [])

    const signInWithEmailAndPassword = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            throw (err)
        }
        setLoading(false)
    };

    const registerWithEmailAndPassword = async (name, email, password) => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password);
            const user = res.user;
            const usersRef = db.ref('users')
            const userInfo = {
                username: name,
                mail: email,
                uid: user.uid,
                accessToken: ''
            }
            await usersRef.push(userInfo)
        } catch (err) {
            throw (err)
        }
    };

    const registerWithGoogle = async () => {
        try {
            const res = await auth.signInWithPopup(googleAuth)
            const usersRef = db.ref('users')
            const userInfo = {
                username: res.additionalUserInfo.profile.given_name,
                mail: res.additionalUserInfo.profile.email,
                uid: res.user.uid,
                accessToken: res.credential.accessToken
            }
            console.log(res)
            usersRef.orderByKey().on('child_added', async (snapshot) =>  {
                const user = db.ref(`users/${snapshot.key}`)
                if (snapshot.val().uid === userInfo.uid) {
                    await user.update({accessToken: res.credential.accessToken})
                }
            })
            if (res.additionalUserInfo.isNewUser === true)
                await usersRef.push(userInfo)
        } catch (err) {
            throw (err)
        }
    };

    const registerWithFacebook = async () => {
        try {
            facebookAuth.addScope('pages_manage_posts')
            facebookAuth.addScope('pages_read_engagement')
            facebookAuth.addScope('pages_show_list')
            const res = await auth.signInWithPopup(facebookAuth)
            const usersRef = db.ref('users')
            const userInfo = {
                username: res.additionalUserInfo.profile.name,
                mail: res.additionalUserInfo.profile.email,
                uid: res.user.uid,
                accessToken: res.credential.accessToken
            }
            usersRef.orderByKey().on('child_added', async (snapshot) =>  {
                const user = db.ref(`users/${snapshot.key}`)
                if (snapshot.val().uid === userInfo.uid) {
                    await user.update({accessToken: res.credential.accessToken})
                }
            })
            if (res.additionalUserInfo.isNewUser === true)
                await usersRef.push(userInfo)
        } catch (err) {
            throw (err)
        }
    };

    const logout = () => {
        return auth.signOut();
    };

    const value = { currentUser, logout, registerWithEmailAndPassword, signInWithEmailAndPassword, registerWithGoogle, registerWithFacebook }

    return <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
}