import './tickets.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Tickets(props) {
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
        const token = localStorage.getItem('accessToken'); // get token from localStorage
        console.log(token)
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
        axios.get(`http://events-api.deti/events/${id}`)
          .then(response => {
              setData(response.data.tickets);
              setEvent(response.data);
          })
          .catch(error => console.log(error));
    }, [id]);

    

    const bookTicket = async (event_name) => {
        if (!selectedTicket || !userData.user_id) {
          return;
        }
      
      
        const confirmBuy = window.confirm("Are you sure you want to buy this ticket?");
        if (confirmBuy){
          console.log("Nome do evento:", event_name);
          const newTicketData = {
            user_id: userData.user_id,
            event_id: event.id,
            price: selectedTicket.price,
            ticket_type: selectedTicket.type,
            event_name: event_name
          };
          console.log(newTicketData);
      
          try {
            const token = localStorage.getItem('accessToken'); // get token from localStorage
            await axios.get('http://app-authentication.deti/verifyToken', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })  
      
            axios.post('http://bookingapi.deti/ticket', newTicketData)
              .then(response => {
                const url = response.data.session_url;
                const newWindow = window.open(url, '_blank');
                const session_id2 = response.data.session_id;
      
                const checkPaymentStatus = new Promise((resolve, reject) => {
                  const intervalId = setInterval(() => {
                    axios.get(`http://bookingapi.deti/ticket/success?session_id=${session_id2}`)
                      //console.log("AQUI1: ", session_id2)
                      .then(response => {
                        if (response.data.message === "Payment was successful") {
                          axios.post(`http://bookingapi.deti/ticket/success?session_id=${session_id2}`)
                            .then(response => {
                              // Handle response from POST request
                              console.log(response.data)
                              // Close the new window
                              newWindow.close();
                              clearInterval(intervalId); // Clear the interval
                              resolve(response.data);
                              //ativar isto quando tiver a funcionar o pagamento
                              sendDataApiNot();
                              bought(event.id);
                            })
                            .catch(error => {
                              // Handle error from POST request
                              console.log(error);
                              reject(error);
                              //clearInterval(intervalId); // Clear the interval on error
                            });
                        } else {
                          // Handle unexpected response from GET request
                        }
                      })
                  }, 3000);  
                  //   axios.get(`/ticket/success?session_id=${response.data.session_id}`)
                  //   .then(response => {
                  //     console.log(response.data)
                  //     // Close the new window
                  //     newWindow.close();
                  //     clearInterval(intervalId); // Clear the interval
                  //     resolve(response.data);
                  //     //ativar isto quando tiver a funcionar o pagamento
                  //     sendDataApiNot();
                  //     bought(event.id);
                  //   })
                  //   .catch(error => {
                  //     console.log(error);
                  //     reject(error);
                  //     //clearInterval(intervalId); // Clear the interval on error
                  //   });
                  // }, 3000);
                });
      
                checkPaymentStatus.then(successResponse => {
                  // Payment was successful
                  console.log(successResponse);
                })
                .catch(error => {
                  // Payment was not successful
                  console.log(error);
                });
              })
              .catch(error => {
                console.log(error);
              });
      
          } catch (error) {
            console.log(error.response.data);
            if (error.response && error.response.status === 401) { // if the token is invalid
              props.onLogout();
              alert("Please log in again.");
              window.location.href = '/login'; // redirect to login page
            }
          }
        }
      };

    function bought(event_id){
        //Buscar nome do evento
        axios
            .get(`http://events-api.deti/events/${event_id}`)
            .then(response => {
            console.log(response.data);
            // handle response data here
            //Buscar id do grupo associado ao nome do evento
            axios.get(`http://notification-api.deti/group/${response.data.name}`)
                .then(response => {
                    console.log(response.data);
                    // handle group response here
                    //adicionar utilizador ao grupo
                    const groupId = response.data.id;
                    const email = localStorage.getItem('email'); 
                    const members = [email]; // replace with your member list
                    axios
                        .put(`http://notification-api.deti/group/${groupId}`, { members })
                        .then(response => {
                        console.log(response.data);
                        // handle response data here
                        // alert("Member added to group");
                        })
                        .catch(error => {
                        console.error(error);
                        // handle error here
                        });

                })
                .catch(error => {
                    console.error(error);
                    // handle error here
                });
            })
            .catch(error => {
            console.error(error);
            // handle error here
            });
        
        alert("Ticket Bought successfully");
    }

    function sendDataApiNot() {
      
        const email = localStorage.getItem('email');

        const postData = {
          to: email,
          subject: "Ticket Bought!",
          message: `Hi ${email}, the ticket was bought successfully and is present on your page "My Tickets" on the website`
        };
    
        axios.post('http://notification-api.deti/notification', postData)
          .then((response) => {
            console.log(response.data);
            window.location.href = 'http://webappfinder.deti/myTickets';
            // do something with the response here
          })
          .catch((error) => {
            console.error(error);
            // handle the error here
          });
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
                            <button className="tickets" onClick={() => bookTicket(event.name)}>BUY</button>
                        </div> 
                    </div>
                ))}
                
            </div>
        </> 
    );
}

export default Tickets;
