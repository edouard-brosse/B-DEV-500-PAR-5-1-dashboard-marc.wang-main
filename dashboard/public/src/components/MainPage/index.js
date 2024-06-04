import React, { useState, Fragment, useContext, useEffect } from 'react'
import Logout from '../logout'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-toastify/dist/ReactToastify.css';
import Widgect_Container from '../Container'

toast.configure();


const MainPage = props => {

    const [userSession , setUserSession] = useState(null);
    const [userData, setUserData] = useState({});

    /*return userSession === null ? (*/
    return userSession != null ? (
        <Fragment>
            <div className="loader" ></div>
            <p>Loading ...</p> 
        </Fragment>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <b>body</b>
                <Widgect_Container></Widgect_Container>
            </div>
        </div>
    )
}

export default MainPage