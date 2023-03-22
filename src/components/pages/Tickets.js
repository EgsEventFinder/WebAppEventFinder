import './tickets.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Tickets() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [event, setEvent] = useState({});
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [userData, setUserData] = useState({
        user_id: null, 
        event_id: null, 
        price: null, 
        ticket_type: null
    });
    

    useEffect(() => {
        axios.get(`/events/${id}`)
          .then(response => {
              setData(response.data.tickets);
              setEvent(response.data);
          })
          .catch(error => console.log(error));
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // get token from localStorage
        console.log(token)
        axios.get('/verifyToken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.user_id);
            setUserData(prevState => ({...prevState, user_id: response.data.user_id}));
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const bookTicket = async () => {
        if (!selectedTicket || !userData.user_id) return;
        const newTicketData = {
          user_id: userData.user_id,
          event_id: event.id,
          price: selectedTicket.price,
          ticket_type: selectedTicket.type
        };
        console.log(newTicketData);
      
        try {
          await axios.post('/ticket', newTicketData);
          bought();
        } catch (error) {
          console.log(error.response.data);
        }
      };

    function bought(){
        alert("Ticket Bought successfully");
    }
    

    return ( 
        <>
            <div className="home_container">
                <h1>Types of Tickets Available </h1>
            </div>
            <div className="container_body">
                {data.map(ticket => (
                    <div className={`item ${selectedTicket === ticket ? 'selected' : ''}`} key={ticket.type} onClick={() => setSelectedTicket(ticket)}>
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
                            <button className="tickets" onClick={bookTicket}>BUY</button>
                        </div> 
                    </div>
                ))}
                
            </div>
        </> 
    );
}

export default Tickets;
