import { Link, useLocation } from "react-router-dom";
import React from "react";
import Container2 from './Container2'
import logo from '../../img/costs_logo.png'
import './navbar.css'

function Navbar({ isAuthenticated, onLogout }) {
    const location = useLocation();

    function handleLogoutClick() {
        onLogout();
      }

    return ( 
        <nav className="navbar">
            <Container2>
                <Link to ="/"><img className="img-logo" src={logo} alt="Event Finder"/></Link>
                <ul className="list">
                    <li className="item"><Link to = "/">Home</Link></li>
                    <li className="item"><Link to = "/events">Eventos</Link></li>
                    <li className="item"><Link to = "/contacts">Contactos</Link></li>
                    {isAuthenticated ? (
                    <>
                      <li className="item"><Link to = "/notifications">Notifications</Link></li>
                      <li className="item"><Link to = "/" onClick={handleLogoutClick}>Logout</Link></li>
                    </>
                   
                    ) : (
                        <li className="item">
                          <Link to={{ pathname: "/login", state: { from: location } }}>
                            Login
                          </Link>
                        </li>
                    )}
                    
                </ul>
            </Container2>
        </nav>
     );
}

export default Navbar;