import './tickets.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
 

function Tickets() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [event, setEvent] = useState({});

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/events/${id}`)
          .then(response => {
              setData(response.data.tickets);
              setEvent(response.data);
          })
          .catch(error => console.log(error));
    }, [id]);

    console.log(data)


    return ( 
        <>
            <div className="home_container">
                <h1>Types of Tickets Available </h1>
            </div>
            <div className="container_body">
                {data.map(ticket => (
                    <div className="item" key={ticket.type}>
                        <div className="item-right">
                            <h2 className="num">{ticket.type}</h2>
                            <p className="day">{ticket.price}€</p>
                            <span className="up-border"></span>
                            <span className="down-border"></span>
                        </div> 
                    
                        <div className="item-left">
                            <p className="event">{event.type}</p>
                            <h2 className="title">{event.name}</h2>
                    
                            <div className="sce">
                                <div className="icon">
                                    <i className="fa fa-table"></i>
                                </div>
                                <p><br/> {event.date}</p>
                            </div>
                            <div className="fix"></div>
                            <div className="loc">
                                <div className="icon">
                                    <i className="fa fa-map-marker"></i>
                                </div>
                                <p>{event.location}<br/><br/> </p>
                            </div>
                            <div className="fix"></div>
                            <button className="tickets">BUY</button>
                        </div> 
                    </div>
                ))}
                
            </div>
        </> 
    );
}

export default Tickets;
