import { WhatsApp } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { actionTypes } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'
import { provider, auth } from '../../firebase'
import "./login.scss"

const Login = () => {

    const [{ }, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then(res => {
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user
            })
        }).catch(e => {
            alert(e.message)
        })
    }

    return (
        <div className='login'>
            <div className="login__container">
                <WhatsApp />
                <div className="login__text">
                    <h1>Sign in to whatsapp</h1>
                </div>
            </div>
            <Button onClick={signIn}>Sing in with Google</Button>
        </div>
    )
}

export default Login