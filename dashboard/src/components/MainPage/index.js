import React, { Fragment } from 'react'
import WidgetContainer from '../Container'
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const MainPage = props => {
    const { currentUser, key, logout } = useAuth()
    const history = useHistory()

    if (!currentUser) {
        history.push('/')
    }
    return (
        <div className="MainBg">
            <div className="container">
                <WidgetContainer currentUser={currentUser} key={key} logout={logout} history={history}/>
            </div>
        </div>
    )
}

export default MainPage