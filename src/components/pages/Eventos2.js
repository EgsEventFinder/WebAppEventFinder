import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Eventos.css'

function Eventos() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/events/')
          .then(response => setEvents(response.data))
          .catch(error => console.log(error));
    }, []);

    return (  
        <div>
            {events.map(event => (
                <div key={event.event_name}>
                    <h2>{event.event_name}</h2>
                    <p>{event.event_location}</p>
                    <p>{event.event_type}</p>
                    <p>{event.event_date}</p>
                    <p>{event.event_description}</p>
                    <p>{event.event_capacity}</p>
                </div>
        ))}
        </div>
        
    );
}

export default Eventos;