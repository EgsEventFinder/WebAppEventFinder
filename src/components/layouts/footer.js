import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import './footer.css'

function footer() {
    return ( 
        <footer className='footer'>
            <ul className='social_list'>
                <li><a style={{color: '#FFB900'}} target='_blank' href="https://www.facebook.com">
                <FaFacebook />
                </a></li>
                <li><a style={{color: '#FFB900'}} target='_blank' href="https://www.instagram.com">
                    <FaInstagram />
                </a></li>
                <li><a style={{color: '#FFB900'}} target='_blank' href="https://www.linkedin.com">
                    <FaLinkedin />
                </a></li>
            </ul>
            <p className='copy_right'>
                <span>Event Finder</span> &copy; 2023 
            </p>
        </footer>
     );
}

export default footer;