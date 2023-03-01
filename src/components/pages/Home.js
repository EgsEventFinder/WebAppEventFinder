import './home.css'
import tickets from '../../img/ticket2.png'
import LinkButton from '../layouts/linkButton'

function Home() {
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