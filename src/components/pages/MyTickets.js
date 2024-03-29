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
    const [selectedTicketIndex, setSelectedTicketIndex] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // get token from localStorage
        console.log(token);
        axios.get('http://app-authentication.deti/verifyToken', {
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
            localStorage.removeItem("accessToken");
            window.location.href = 'http://webappfinder.deti';
        });
    }, []);

    useEffect(() => {
        const userId = userData.user_id;
        if (userId) {
          axios.get(`http://bookingapi.deti/ticket/user/tickets?user_id=${userId}`)
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
          const eventsPromises = tickets.map(ticket => axios.get(`http://events-api.deti/events/${ticket.event_id}`));
          const eventsData = await Promise.all(eventsPromises);
          setEvents(eventsData.map(event => event.data));
        };
        fetchEvents();
      }, [tickets]);

      function deleteTicket(ticket_id) {
        const userId = userData.user_id;
        axios
          .delete(`http://bookingapi.deti/ticket/${ticket_id}`, { data: { user_id: userId } })
          .then((response) => {
            console.log(response.data.message); // Display success message in console
            window.location.href = 'http://webappfinder.deti/myTickets';
          })
          .catch((error) => {
            console.log(error.response.data.message); // Display error message in console
          });
      }

      const handleTicketTrade = async (ticketId, email) => {
        const sellerEmail = localStorage.getItem('email');
        const sellerId = userData.user_id; // replace with the actual seller ID
        try {
          const buyerId = await getBuyerId(email);
          const buyerEmail = email; // replace with the actual buyer email
          console.log(ticketId, sellerId, email, buyerId, buyerEmail);
      
          const response = await axios.get(`http://bookingapi.deti/ticket/${ticketId}/trade`, {
            params: {
              seller_id: sellerId,
              seller_email: sellerEmail,
              buyer_id: buyerId,
              buyer_email: buyerEmail
            }
          });
      
          if (response.status === 200) {
            // Ticket traded successfully, complete the trade
            const sellUrl = response.data.url;
            console.log(sellUrl);
            // Ticket traded successfully, update UI or redirect to a confirmation page
            console.log('Ticket traded successfully!');
                  
            // Make a POST request to /notification
            await axios.post('http://notification-api.deti/notification', {
              to: sellerEmail,
              subject: 'Ticket trade confirmation',
              message: `Click on the following link to confirm the ticket sell to the user ${buyerEmail}: ${sellUrl}`,
            });
      
            console.log('Email sent successfully!');
            alert("Email of the sale Confirmation sent to the Buyer!")
            window.location.href = '/';
          } else {
            // Error occurred, handle the error
            console.log('Error occurred while trading ticket.');
          }
        } catch (error) {
          // Handle errors
          console.log(error);
        }
      
        setEmail('');
      };

      function getBuyerId(email){
        return axios.get(`http://app-authentication.deti/user/email/${email}`)
          .then(response => {
            const buyerId = response.data.id;
            console.log(buyerId);
            return buyerId;
          })
          .catch(error => {
            console.log('Error occurred while getting buyer ID.');
            throw error;
          });
      }


      return (
        <>
          <div className="home_container_tickets">
            <h1>My Tickets</h1>
          </div>
          <div className="container_body_tickets">
            {tickets.map((ticket, index) => {
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
                  <div className="item-left" style={{ flexDirection: 'column' }}>
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
                    <button className="sell-button" onClick={() => setSelectedTicketIndex(index)}>Sell to other person</button>
                  </div>
                  <div className="item-right">
                    <h2 className="num">{ticket.type}</h2>
                    <p className="day">{ticket.price}€</p>
                    
                    <span className="up-border"></span>
                    <span className="down-border"></span>
                    <img className="qrcode" src={`https://api.qrserver.com/v1/create-qr-code/?data=exemplo_data&amp;size=200x200`} alt="QR Code" />  
                  </div>
                  <div className="sell-popup" style={{display: selectedTicketIndex === index ? 'block' : 'none'}}>
                    <button className="close-button" onClick={() => setSelectedTicketIndex(-1)}>X</button>
                    <div className="sell-form">
                      <label htmlFor="sell-email">Email Address</label>
                      <input type="email" id="sell-email" name="sell-email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                      <button className="submit-button" onClick={() => { 
                      setSelectedTicketIndex(-1);
                      handleTicketTrade(ticket.ticket_id, email)
                    }}>Submit</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
      
}

export default MyTickets;