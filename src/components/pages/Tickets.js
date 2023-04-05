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
            localStorage.removeItem("accessToken");
            window.location.href = 'http://localhost:3000';
        });
    }, []);
    

    useEffect(() => {
        axios.get(`/events/${id}`)
          .then(response => {
              setData(response.data.tickets);
              setEvent(response.data);
          })
          .catch(error => console.log(error));
    }, [id]);

    

    const bookTicket = async (event_name) => {
        if (!selectedTicket || !userData.user_id){
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
                await axios.get('/verifyToken', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })  

                let paymentSuccessful = false;

                axios.post('/ticket', newTicketData)
                    .then(response => {
                        const url = response.data.url;
                        window.open(url, '_blank');
                        
                        // const checkSuccess = new Promise((resolve, reject) => {
                        // const intervalId = setInterval(() => {
                        //     if (!paymentSuccessful) {
                        //     axios.get('/success')
                        //         .then(response => {
                        //         clearInterval(intervalId);
                        //         paymentSuccessful = true;
                        //         resolve(response.data);
                        //         })
                        //         .catch(error => {
                        //         console.log(error);
                        //         reject(error);
                        //         });
                        //     }
                        // }, 1000);
                        // });

                        // checkSuccess.then(successResponse => {
                        // // Do something with the successful response
                        // })
                        // .catch(error => {
                        // console.log(error);
                        // });

                        // checkSuccess.then(() => {
                        // const intervalId = setInterval(() => {
                        //     if (!paymentSuccessful) {
                        //     axios.get('/cancel')
                        //         .then(response => {
                        //         clearInterval(intervalId);
                        //         // Do something with the cancelled response
                        //         })
                        //         .catch(error => {
                        //         console.log(error);
                        //         });
                        //     }
                        // }, 1000);
                        // });
                    })
                    .catch(error => {
                        console.log(error);
                    });

                //ativar isto quando tiver a funcionar o pagamento
                // sendDataApiNot();
                // bought(event.id);
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
            .get(`/events/${event_id}`)
            .then(response => {
            console.log(response.data);
            // handle response data here
            //Buscar id do grupo associado ao nome do evento
            axios.get(`/group/${response.data.name}`)
                .then(response => {
                    console.log(response.data);
                    // handle group response here
                    //adicionar utilizador ao grupo
                    const groupId = response.data.id;
                    const email = localStorage.getItem('email'); 
                    const members = [email]; // replace with your member list
                    axios
                        .put(`/group/${groupId}`, { members })
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
    
        axios.post('/notification', postData)
          .then((response) => {
            console.log(response.data);
            window.location.href = 'http://localhost:3000/myTickets';
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
