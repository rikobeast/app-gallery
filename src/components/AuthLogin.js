import React from 'react'
import '../styles/auth.css'
import { Link } from 'react-router-dom'

function AuthLogin() {
    return (
        <div className="login-page">
            <div className="login-container">
                <h2 id="heading">Log in</h2>
                <form className="login-form">
                    <input type="text" className="username" placeholder="Username"></input>
                    <input type="password" className="password" placeholder="Password"></input>
                    <button id="auth-button">Login</button>
                    <Link to="/register" id="reg-redirect">Don't have an account? Register here.</Link>
                </form>
            </div>
        </div>
    )
}

export default AuthLogin