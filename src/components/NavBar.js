import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import '../styles/navbar.css'

function NavBar() {
    return (
        <Switch>
            <div className="navigation">
            <div className="left-nav">
                <Link id="nav-option" to="/">Home</Link>
                <Link id="nav-option" to="/games">Games</Link>
                <Link id="nav-option" to="/upload">Upload</Link>
                <Link id="nav-option" to="/discussions">Discussions</Link>
            </div>
            <div className="right-nav">
                <Link id="nav-option" to="/login">Login</Link>
                <Link id="nav-option" to="/register">Register</Link>
            </div>
        </div>
        </Switch>
        
    )
}
export default NavBar
