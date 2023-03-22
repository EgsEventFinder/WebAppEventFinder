import './myTickets.css'
import axios from 'axios';
import { useState, useEffect } from 'react';



function MyTickets() {

    const [events, setEvents] = useState({});
    const [tickets, setTickets] = useState([]);
    const [userData, setUserData] = useState({
        user_id: null, 
        event_id: null, 
        price: null, 
        ticket_type: null
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // get token from localStorage
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

    useEffect(() => {
        const userId = userData.user_id;
        if (userId) {
          axios.get(`/ticket/user/tickets?user_id=${userId}`)
            .then(response => {
              console.log(response.data.tickets);
              setTickets(response.data.tickets);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }, [userData.user_id]);


      useEffect(() => {
        const fetchEvents = async () => {
          const eventsPromises = tickets.map(ticket => axios.get(`/events/${ticket.event_id}`));
          const eventsData = await Promise.all(eventsPromises);
          setEvents(eventsData.map(event => event.data));
        };
        fetchEvents();
      }, [tickets]);

    


      return (
        <>
            <div class="home_container_tickets">
                <h1>My Tickets</h1>
            </div>
            <div class="container_body_tickets">
                {tickets.map((ticket) => {
                const event = events.find((event) => event.id === ticket.event_id);
                if (!event) {
                    return null; // Event not found
                }
                return (
                    <div class="item" key={`${ticket.event_id}-${ticket.booking_date}`}>
                    <div class="item-left">
                        <h2 class="title">{event.name}</h2>
                        <p class="event">{event.type}</p>
                        <div class="sce">
                        <div class="icon">
                            <i class="fa fa-table"></i>
                        </div>
                        <p>{event.date}</p>
                        </div>
                        <div class="loc">
                        <div class="icon">
                            <i class="fa fa-map-marker"></i>
                        </div>
                        <p>{event.location}</p>
                        </div>
                    </div>
                    <div class="item-right">
                        <h2 class="num">{ticket.type}</h2>
                        <p class="day">{ticket.price}€</p>
                        <span class="up-border"></span>
                        <span class="down-border"></span>
                        <img class="qrcode" src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket.qr_code_data}&amp;size=200x200`} alt="QR Code" />
                    </div>
                    </div>
                );
                })}
            </div>
        </>
      );
}

export default MyTickets;