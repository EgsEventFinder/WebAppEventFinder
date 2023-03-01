import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import './footer.css'

function footer() {
    return ( 
        <footer className='footer'>
            <ul className='social_list'>
                <li><FaFacebook/></li>
                <li><FaInstagram/></li>
                <li><FaLinkedin/></li>
            </ul>
            <p className='copy_right'>
                <span>Event Finder</span> &copy; 2023 
            </p>
        </footer>
     );
}

export default footer;