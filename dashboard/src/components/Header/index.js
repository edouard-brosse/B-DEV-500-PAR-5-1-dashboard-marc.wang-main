import React, { useState, useEffect, Component } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';
import { db } from '../Provider/SetupFirebase';

const Header = () => {
    const location = useLocation();
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [username, setName] = useState('Utilisateur')

    const getUsername = async () => {
        const myRef = db.ref(`users`)
        if (currentUser)
            myRef.orderByKey().on('child_added', (snapshot) => {
                if (snapshot.val().uid === currentUser.uid) {
                    setName(snapshot.val().username)
                }
            });
    }

    useEffect(() => {
        getUsername()
    }, [])

    const mainHead = (
        <div className="banner-container" >
            <h1><a href="/">Dashboard 2021</a></h1>
            {currentUser ? <div className='userName'>Salut {username} !</div>
             : <></>}
            <IconButton>
                <LogoutIcon onClick={() => {
                    logout()
                    history.push('/')
                }} className='logoutButton'
                />
            </IconButton>
        </div>
    )
    const secondHead = (
        <div >
            <div className="banner-containerSecond">
                <h1 className="headSelect"><a href="/">Dashboard Home</a></h1>
            </div>
        </div>
    )

    return (
        <header className="header">
            {location.pathname === "/MainPage" ?  mainHead : secondHead}
        </header>
    )
}

export default Header