import {Link} from "react-router-dom";

import Container2 from './Container2'
import logo from '../../img/costs_logo.png'
import './navbar.css'

function navbar() {
    return ( 
        <nav className="navbar">
            <Container2>
                <Link to ="/"><img className="img-logo" src={logo} alt="Event Finder"/></Link>
                <ul className="list">
                    <li className="item"><Link to = "/">Home</Link></li>
                    <li className="item"><Link to = "/events">Eventos</Link></li>
                    <li className="item"><Link to = "/contacts">Contactos</Link></li>
                    <li className="item"><Link to = "/login">Login</Link></li>
                </ul>
            </Container2>
        </nav>
     );
}

export default navbar;