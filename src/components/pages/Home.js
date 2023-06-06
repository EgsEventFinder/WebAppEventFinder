import './home.css'
import tickets from '../../img/ticket2.png'
import LinkButton from '../layouts/linkButton'

function Home(props) {

    console.log(props.isAuthenticated);

    const myData = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');

    if(!props.isAuthenticated){
        localStorage.removeItem('accessToken');
        ///// adicionei isto, se houver problemas, remover proxima linha
        localStorage.removeItem('email');
    }

    if (myData) {
        // Data exists in local storage
        console.log('Data retrieved from local storage: ', myData, email);
    } else {
        // Data doesn't exist in local storage
        console.log('No data found in local storage.');
    }
    return ( 
        <section className='home_container'>
            <h1>Welcome to <span>Event Finder</span></h1>
            <p>Find the events you want, right now!</p>
            <LinkButton to="/events" text="Find Event" />
            <img src={tickets} alt="tickets"/>
        </section>
        
    )
}

export default Home