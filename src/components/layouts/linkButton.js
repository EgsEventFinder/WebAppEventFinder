import { Link } from 'react-router-dom';
import './linkButton.css'

function linkButton({ to, text }) {
    return ( 
        <Link className='btn' to={to}>
            {text}
        </Link>
     );
}

export default linkButton;