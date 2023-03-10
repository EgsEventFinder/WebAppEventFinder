import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Eventos.css';
import imagem from '../../img/img3.jpg';
import { Link } from 'react-router-dom';

function Eventos() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/events/')
          .then(response => setEvents(response.data))
          .catch(error => console.log(error));
    }, []);

    return (  
        <>  
            <div className = "home_container">
                <h1>Eventos Disponíveis </h1>
            </div>
            <div className = "container_body">
                
                <div class="container">
                {events.map(event => (
                    <div class="item-container">
                        <div class="img-container">
                            <img src={imagem} alt=""/>
                        </div>
                        <div class="body-container">
                            <div class="overlay"></div>

                            <div class="event-info">
                                <p class="title">{event.name}</p>
                                <div class="separator"></div>
                                <p class="info">{event.location}</p>
                                <p class="price">{event.type}</p>

                                <div class="additional-info">
                                    <p class="info">
                                        <i class="fas fa-map-marker-alt"></i>
                                        Lotação: {event.capacity}
                                    </p>
                                    <p class="info">
                                        <i class="far fa-calendar-alt"></i>
                                        Data: {event.date}
                                    </p>

                                    <p class="info description">
                                    {event.description}
                                    </p>
                                </div>
                            </div>
                            
                            <Link to={`/tickets/${event.event_id}`}><button class="action">Book it</button></Link>
        
                        </div>
                    </div>
                ))}
                </div>
            
            </div>
        </>
    );
}

export default Eventos;