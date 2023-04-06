import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Eventos.css';
import imagem from '../../img/img3.jpg';
import { Link } from 'react-router-dom';

function Eventos() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // get token from localStorage
        console.log(token)
        axios.get('/verifyToken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Token Válido");
        })
        .catch(error => {
            console.log(error);
            localStorage.removeItem("accessToken");
            window.location.href = 'http://localhost:3000';
        });
    }, []);

    useEffect(() => {
        axios.get('/events')
          .then(response => setEvents(response.data))
          .catch(error => console.log(error));
    }, []);

    return (  
        <>  
            <div className = "home_container">
                <h1>Eventos Disponíveis </h1>
            </div>
            <div className = "container_body">
                
                <div className="container">
                {events.map(event => (
                    <div className="item-container" key={event.id}>
                        <div className="img-container">
                            <img src={imagem} alt=""/>
                        </div>
                        <div className="body-container">
                            <div className="overlay"></div>

                            <div className="event-info">
                                <p className="title">{event.name}</p>
                                <div className="separator"></div>
                                <p className="info">{event.location}</p>
                                <p className="price">{event.type}</p>

                                <div className="additional-info">
                                    <p className="info">
                                        <i className="fas fa-map-marker-alt"></i>
                                        Lotação: {event.capacity}
                                    </p>
                                    <p className="info">
                                        <i className="far fa-calendar-alt"></i>
                                        Data: {event.date}
                                    </p>

                                    <p className="info description">
                                    {event.description}
                                    </p>
                                </div>
                            </div>
                            <Link to={`/tickets/${event.id}`}><button className="action">Book it</button></Link>
        
                        </div>
                    </div>
                ))}
                </div>
            
            </div>
        </>
    );
}

export default Eventos;