import React from 'react'
import '../styles/auth.css'
import { Link } from 'react-router-dom'

function AuthRegister() {
    return (
        <div className="register-page">
            <div className="register-container">
                <h2 id="heading">Create an account</h2>
                <form className="register-form">
                    <input type="text" className="username" placeholder="Username"></input>
                    <input type="email" className="email" placeholder="Email"></input>
                    <input type="password" className="password" placeholder="Password"></input>
                    <input type="password" className="password-confirm" placeholder="Confirm password"></input>
                    <button id="auth-button">Create</button>
                    <Link to="/login" id="reg-redirect">Already have an account? Log in.</Link>
                </form>
            </div>
        </div>
    )
}

export default AuthRegister