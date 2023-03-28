import './home.css'
import tickets from '../../img/ticket2.png'
import LinkButton from '../layouts/linkButton'

function Home(props) {

    console.log(props.isAuthenticated);

    const myData = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');

    if(!props.isAuthenticated){
        localStorage.removeItem('accessToken');
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
            <h1>Bem-vindo ao <span>Event Finder</span></h1>
            <p>Encontre os eventos que quer, agora mesmo!</p>
            <LinkButton to="/events" text="Encontrar Evento" />
            <img src={tickets} alt="tickets"/>
        </section>
        
    )
}

export default Home