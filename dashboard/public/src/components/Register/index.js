import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'

const Signup = (props) => {

    console.log("register")

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

   const [loginData, setLoginData] = useState(data);
   const [error, setError] = useState('');

   const handleChange = e => {
    setLoginData({...loginData, [e.target.id]: e.target.value })
   }

   const {pseudo, email, password, confirmPassword} = loginData;

   const btn = pseudo === '' || email === '' || password === '' || confirmPassword !== password
   ? <button disabled>Inscription</button> : <button >Inscription</button>

   // gestion des erreurs
   const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <h2>Inscription/Register</h2>
                        <form >
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required/>
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required/>
                                <label htmlFor="confirmPassword">Confirmer le Mot de passe</label>
                            </div>

                            {btn}
                        </form>
                        <div className="linkContainer">
                            <div>
                                <Link className="simpleLink" to="/login"> Connection </Link>
                            </div>
                            <div>
                                <Link className="simpleLink" to="/"> page d'aceuil </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup