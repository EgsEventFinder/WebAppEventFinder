import { Link, useLocation} from "react-router-dom";
import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import React from "react";
import Container2 from './Container2'
import logo from '../../img/costs_logo.png'
import './navbar.css'

function Navbar({ isAuthenticated, onLogout }) {
    const location = useLocation();

    const [toggleMenu, setToggleMenu] = useState(false);

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
                      <li>
                        <div className="gpt3__navbar-menu">
                          {toggleMenu
                            ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                            : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                          {toggleMenu && (
                          <div className="gpt3__navbar-menu_container scale-up-center">
                            <div className="gpt3__navbar-menu_container-links">
                              <Link to="/myProfile"><p>Profile</p></Link>
                              <Link to="/myTickets"><p>My Tickets</p></Link>
                              <Link to="/myGroups"><p>My Groups</p></Link>
                            </div>
                          </div>
                          )}
                        </div>
                        </li>
                    </>
                   
                    ) : (
                      <>
                        <li className="item">
                          <Link to={{ pathname: "/login", state: { from: location } }}>
                            Login
                          </Link>
                        </li>
                        
                      </> 
                    )}
                    
                </ul>
            </Container2>
        </nav>
     );
}

export default Navbar;