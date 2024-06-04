import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useHistory } from 'react-router'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import { IconButton } from '@mui/material'

const Login = (props) => {
    const history = useHistory()
    const data = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [registerData, setLoginData] = useState(data);
    const { email, password } = registerData;
    const handleChange = e => {
        setLoginData({ ...registerData, [e.target.id]: e.target.value })
    }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const { currentUser, signInWithEmailAndPassword, registerWithGoogle, registerWithFacebook} = useAuth()
    async function handleLogin(e) {
        e.preventDefault()
        try {
            setLoading(true)
            await signInWithEmailAndPassword(email, password)
            history.push('/MainPage')
        } catch (error) {
            setLoading(false)
            setError(true)
            const errorCode = error.code
            const errorMessage = error.message
            if (errorCode === 'auth/invalid-email') {
                setErrorMsg('Format d\'email invalide')
            } else if (errorCode === 'auth/user-disabled') {
                setErrorMsg('Utilisateur banni')
            } else if (errorCode === 'auth/user-not-found') {
                setErrorMsg('Utilisateur introuvable')
            } else if (errorCode === 'auth/wrong-password') {
                setErrorMsg('Mot de passe erroné')
            } else {
                setErrorMsg(errorMessage);
            }
        }
        setLoading(false)
    }
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
    const btn = email.includes('@') === false || password === ''
        ? <button disabled>Connection</button> : <button disabled={loading} type="submit" onClick={handleLogin} > Connection</button >
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
                        <h2>Connection</h2>
                        <form>
                            <div className='otherConnection'>
                                <IconButton onClick={handleGoogleRegister} className='iconButton'>
                                    <GoogleIcon />
                                </IconButton>
                                <IconButton onClick={handleFacebookRegister} className='iconButton'>
                                    <FacebookIcon />
                                </IconButton>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            {btn}
                            {error && <div className="ErrorRegisterLogin">
                                {errorMsg}
                            </div>}
                        </form>
                        <div className="linkContainer">
                            <div>
                                <Link className="simpleLink" to="/register"> Pas encore inscrit ? </Link>
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

export default Login