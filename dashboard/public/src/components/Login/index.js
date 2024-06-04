import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');


    const Text_style = {
        textAlign: 'center',
        color: '#ffff',
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeft">
                    <div className="formContent">
                        <h2 style={Text_style} >AUTRE type de conection</h2>
                        <p style={Text_style}>autre a rajouter avec AUTH</p>
                    </div>
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {error !== '' && <span>{error.message}</span>}

                        <h2>Connexion</h2>
                        <form >

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button> }

                        </form>
                        <div className="linkContainer">
                            <div>
                                <Link className="simpleLink" to="/signup"> Inscription </Link>
                            </div>
                            <div>
                                <Link className="simpleLink" to="/"> page d'aceuil </Link>
                            </div>
                            <br />
                            <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login