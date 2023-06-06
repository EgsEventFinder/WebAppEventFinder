import { Link, useLocation} from "react-router-dom";
import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import React from "react";
import Container2 from './Container2'
//import logo from '../../img/costs_logo.png'
import './navbar.css'
import { FaTicketAlt } from 'react-icons/fa';
import { useEffect } from "react";

function Navbar({ isAuthenticated, onLogout }) {
    const location = useLocation();

    const [isAdmin, setisAdmin] = useState(false);


    const [toggleMenu, setToggleMenu] = useState(false);
    const [username, setUsername] = useState('');

    function handleLogoutClick() {
        onLogout();
      }
    
    useEffect(() => {
      const email = localStorage.getItem('email');
      if(email){
        console.log (email);
        const username = email.split('@')[0];
        setUsername(username);
        if(username === 'eventfinderteste'){
          setisAdmin(true);
        }
      }
    }, []);

    return ( 
  
        <nav className="navbar">
            <Container2>
                {/* <Link to ="/"><img className="img-logo" src={logo} alt="Event Finder"/></Link> */}
                <div className="icon">
                  <Link to="/">
                    <FaTicketAlt className="ticket-icon" size={60} style={{color: '#FDE74C'}} />
                  </Link>
                  <div className="username">
                  {isAuthenticated ? ( <h3>Welcome {username}</h3> ) : ( <></> )}
                  </div>
                </div>
                
                
                <ul className="list">
                    <li className="item_navbar"><Link to = "/">Home</Link></li>
                    <li className="item_navbar"><Link to = "/events">Events</Link></li>
                    {isAuthenticated ? ( <></> ) : ( <li className="item_navbar"><Link to = "/contacts">Contacts</Link></li> )}
                    {/* <li className="item_navbar"><Link to = "/contacts">Contacts</Link></li> */}
                    
                    {isAuthenticated ? (
                    <>
                      <li className="item_navbar"><Link to="/myTickets">My Tickets</Link></li>
                      <li className="item_navbar"><Link to = "/notifications">Notifications</Link></li>
                      {/* <li className="item_navbar"><Link to = "/eventsManagement">Admin</Link></li> */}
                      {isAdmin ? ( <li className="item_navbar"><Link to="/eventsManagement">Admin</Link></li> ) : ( <></> )}
                      <li className="item_navbar"><Link to = "/" onClick={handleLogoutClick}>Logout</Link></li>
                      {/* <li className="item_navbar">{username}</li> */}
                      
                    </>
                   
                    ) : (
                      <>
                        <li className="item_navbar">
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