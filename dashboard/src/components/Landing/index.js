import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Landing = () => {
    const { currentUser } = useAuth()
    const history = useHistory()
    if (currentUser)
        history.push('/MainPage')
    const displayBtn = (
        <Fragment>
            <div className="leftBox">
                <Link className="btnLanding" to="/register"> Inscription</Link>
            </div>
            <div className="rightBox">
                <Link className="btnLanding" to="/login"> Connection </Link>
            </div>
        </Fragment>
    )

    return (
        <main className="welcomePage">
            {displayBtn}
        </main>
    )
}

export default Landing