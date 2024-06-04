import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { useAuth } from '../hooks/useAuth.js'
import { useHistory } from 'react-router'
import { IconButton } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'

const Signup = (props) => {
    const history = useHistory()
    const data = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [registerData, setLoginData] = useState(data);
    const { username, email, password, confirmPassword } = registerData;
    const handleChange = e => {
        setLoginData({ ...registerData, [e.target.id]: e.target.value })
    }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('Inscription impossible')
    const { currentUser, registerWithEmailAndPassword, registerWithGoogle, registerWithFacebook } = useAuth()

    async function handleGoogleRegister(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await registerWithGoogle()
            history.push('/MainPage')
        } catch (error) {
            if (error.code === '') {
            } else
                setErrorMsg(error.message)
        }
    }
    async function handleFacebookRegister(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await registerWithFacebook()
            history.push('/MainPage')
        } catch (error) {
            if (error.code === '') {
            } else
                setErrorMsg(error.message)
        }
    }

    async function handleRegister(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await registerWithEmailAndPassword(username, email, password)
            history.push('/MainPage')
        } catch (error) {
            setLoading(false)
            setError(true)
            if (error.code === 'auth/weak-password') {
                setErrorMsg('Mot de passe trop faible');
            } else if (error.code === 'auth/email-already-in-use') {
                setErrorMsg('Cet email est déjà utilisé')
            } else if (error.code === 'auth/invalid-email') {
                setErrorMsg('Le format de l\'email est incorrect')
            } else if (error.code === 'auth/operation-not-allowed') {
                setErrorMsg('Vous n\'êtes pas autorisé à faire cela')
            } else {
                setErrorMsg(error.message);
            }
        }
        setLoading(false)
    }
    const btn = username === '' || email.includes('@') === false || password === '' || confirmPassword !== password
        ? <button disabled>Inscription</button> : <button disabled={loading} type="submit" onClick={handleRegister} > Inscription</button >
    
    if (currentUser) {
        history.push('/MainPage')
    }
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <h2>Inscription/Register</h2>
                        <form>
                            <div className='otherConnection'>
                            <IconButton onClick={handleGoogleRegister} className='iconButton'>
                                <GoogleIcon/>
                            </IconButton>
                            <IconButton onClick={handleFacebookRegister} className='iconButton'>
                                <FacebookIcon/>
                            </IconButton>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={username} type="text" id="username" autoComplete="off" required />
                                <label htmlFor="username">Pseudo</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword">Confirmer le Mot de passe</label>
                            </div>
                            {btn}
                            {error && <Alert className="ErrorRegisterLogin" variant="danger" message={errorMsg}>
                            {errorMsg}
                        </Alert>}
                        </form>
                        <div className="linkContainer">
                            <div>
                                <Link className="simpleLink" to="/login"> Déjà inscrit ? </Link>
                            </div>
                            <div>
                                <Link className="simpleLink" to="/"> Page d'accueil </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup