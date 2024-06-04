import React, { Component, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import Logout from '../logout'
import Navbar from 'react-bootstrap/Navbar'


const Header = () =>  {
    
    const location = useLocation();

    const mainHead = (
        <div className="banner-container" >
            <h1><a href="/">Dashboard 2021</a></h1>
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
            {location.pathname === "/Welcome" ? secondHead : mainHead}
        </header>
    )
}

export default Header