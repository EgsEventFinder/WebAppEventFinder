import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Eventos.css';
import imagem from '../../img/img3.jpg';

function Eventos() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/events/')
          .then(response => setEvents(response.data))
          .catch(error => console.log(error));
    }, []);

    return (  
        <>  
            <div className = "home_container">
                <h1>Eventos Disponíveis </h1>
            </div>
            <div className = "container_body">
                {events.map(event => (
                <div class="container">
                    <div class="item-container">
                        <div class="img-container">
                            <img src={imagem} alt=""/>
                        </div>
                        <div class="body-container">
                            <div class="overlay"></div>

                            <div class="event-info">
                                <p class="title">{event.event_name}</p>
                                <div class="separator"></div>
                                <p class="info">{event.event_location}</p>
                                <p class="price">{event.event_type}</p>

                                <div class="additional-info">
                                    <p class="info">
                                        <i class="fas fa-map-marker-alt"></i>
                                        Lotação: {event.event_capacity}
                                    </p>
                                    <p class="info">
                                        <i class="far fa-calendar-alt"></i>
                                        Data: {event.event_date}
                                    </p>

                                    <p class="info description">
                                    {event.event_description}
                                    </p>
                                </div>
                            </div>
                            <button class="action">Book it</button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </>
    );
}

export default Eventos;