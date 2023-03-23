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

      function deleteTicket(ticket_id) {
        const userId = userData.user_id;
        axios
          .delete(`/ticket/${ticket_id}`, { data: { user_id: userId } })
          .then((response) => {
            console.log(response.data.message); // Display success message in console
            window.location.href = 'http://localhost:3000/myTickets';
          })
          .catch((error) => {
            console.log(error.response.data.message); // Display error message in console
          });
      }


      return (
        <>
            <div className="home_container_tickets">
            <h1>My Tickets</h1>
            </div>
            <div className="container_body_tickets">
            {tickets.map((ticket) => {
                const event = events.find((event) => event.id === ticket.event_id);
                if (!event) {
                return null; // Event not found
                }
                const handleDelete = () => {
                  if (window.confirm("Are you sure you want to delete this ticket?")) {
                    deleteTicket(ticket.ticket_id);
                  }
                };
                return (
                <div className="item" key={`${ticket.event_id}-${ticket.booking_date}`}>
                    <button className="delete-button" onClick={handleDelete}>X</button>
                    <div className="item-left">
                    <h2 className="title">{event.name}</h2>
                    <p className="event">{event.type}</p>
                    <div className="sce">
                        <div className="icon">
                        <i className="fa fa-table"></i>
                        </div>
                        <p>{event.date}</p>
                    </div>
                    <div className="loc">
                        <div className="icon">
                        <i className="fa fa-map-marker"></i>
                        </div>
                        <p>{event.location}</p>
                    </div>
                    </div>
                    <div className="item-right">
                    <h2 className="num">{ticket.type}</h2>
                    <p className="day">{ticket.price}€</p>
                    <span className="up-border"></span>
                    <span className="down-border"></span>
                    <img className="qrcode" src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket.qr_code_data}&amp;size=200x200`} alt="QR Code" />
                    
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
      
}

export default MyTickets;