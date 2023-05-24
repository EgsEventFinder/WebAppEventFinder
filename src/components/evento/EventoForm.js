import './eventoForm.css'
import React, { useState, useEffect} from 'react';
import axios from 'axios';

function EventoForm() {

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // get token from localStorage
        console.log(token);
        axios.get('/verifyToken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.user_id);
        })
        .catch(error => {
            console.log(error);
            localStorage.removeItem("accessToken");
            window.location.href = 'http://localhost:3000';
        });
    }, []);

    //constantes para adicionar evento ou atualizar
    const [name, setName] = useState('');
    const [location, setlocation] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [tickets, setTickets] = useState([]);

    //constantes para atualizar evento 
    const [name2, setName2] = useState('');
    const [location2, setlocation2] = useState('');
    const [category2, setCategory2] = useState('');
    const [description2, setDescription2] = useState('');
    const [date2, setDate2] = useState('');
    const [capacity2, setCapacity2] = useState('');
    const [tickets2, setTickets2] = useState([]);

    //constante para remover evento
    const [eventId, setEventId] = useState('');


    function handleSubmit(event) {
        event.preventDefault(); // prevent default form submission
      
        // Create an object with the form data
        const formData = {
          name,
          location,
          type: category, // Use "category" value as "type" in the API endpoint
          description,
          date,
          capacity,
          tickets,
        };
      
        // Send a POST request to the API endpoint with the form data
        axios
          .post("/events", formData)
          .then((response) => {
            // Do something with the response, such as show a success message
            console.log("Event created:", response.data.Event);
            //Create the group
            createGroup(response.data.Event);
            sendNotGroup(name);
            alert("Evento Criado Com Sucesso !");
            window.location.href = 'http://localhost:3000/eventsManagement';
          })
          .catch((error) => {
            console.error("Error creating event:", error);
            // Do something with the error, such as show an error message
            alert("Erro ao Criar o Evento !");
          });
      }

    const handleAddTicket = () => {
        setTickets([...tickets, { type: "", price: "" }]);
      };
      
    const handleTicketChange = (index, event) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][event.target.name] = event.target.value;
    setTickets(updatedTickets);
    };
    
    const handleTicketRemove = (index) => {
    const updatedTickets = [...tickets];
    updatedTickets.splice(index, 1);
    setTickets(updatedTickets);
    };

    //for update
    const handleAddTicket2 = () => {
        setTickets2([...tickets2, { type: "", price: "" }]);
      };
      
    const handleTicketChange2 = (index, event) => {
    const updatedTickets2 = [...tickets2];
    updatedTickets2[index][event.target.name] = event.target.value;
    setTickets2(updatedTickets2);
    };
    
    const handleTicketRemove2 = (index) => {
    const updatedTickets2 = [...tickets2];
    updatedTickets2.splice(index, 1);
    setTickets2(updatedTickets2);
    };
      

    const handleDelete = (event) => {
        event.preventDefault();
        //Eliminar grupo
        axios
            .get(`/events/${eventId}`)
            .then(response => {
                console.log(response.data);
                deleteGroup(response.data.name);
        })
        .catch(error => {
        console.error(error);
        // handle error here
        });
        

        // TODO: send the event ID to the server to delete the event using axios
        axios.delete(`/events/${eventId}`)
        .then(response => {
        console.log(response.data);
        // handle response data here
        alert("Evento Eliminado Com Sucesso !");
        window.location.href = 'http://localhost:3000/eventsManagement';
        })
        .catch(error => {
        console.error(error);
        // handle error here
        alert("Erro ao Eliminar o Evento !");
        });
      };

    const handleUpdate = (event) => {
        event.preventDefault(); // prevent default form submission
      
        // Create an object with the form data
        const formData = {
          name: name2,
          location: location2,
          type: category2, // Use "category" value as "type" in the API endpoint
          description: description2,
          date: date2,
          capacity: capacity2,
          tickets: tickets2,
        };
      
        // Send a POST request to the API endpoint with the form data
        axios.put(`/events/${eventId}`, formData)
        .then(response => {
            console.log(response.data);
            // handle response data here
            sendNotGroupEventUpdate(name2);
            alert("Evento Atualizado Com Sucesso !");
            //window.location.href = 'http://localhost:3000/eventsManagement';
        })
        .catch(error => {
            console.error(error);
            // handle error here
            alert("Erro ao Atualizar o Evento !");
            });
    };

    function createGroup(data){
        //console.log(data.name);
        const { name } = data;

        axios.post('/group', { name })
            .then(response => {
            console.log(response.data);
            // handle response data here
            })
            .catch(error => {
            console.error(error);
            // handle error here
            });
    }

    function sendNotGroup(name){
        axios.get('/users')
            .then(response => {
            const users = response.data;
            const emails = users.map(user => user.email);
            console.log(emails);
            // Use the retrieved email addresses as needed
            // handle response data here
            axios.post('/notification', {
                to: emails, // or an array of email addresses
                subject: 'Novo Evento Disponível!',
                message: `Está Disponivel um novo evento(${name})no WebSite! Check it out!`
                })
                .then(response => {
                console.log(response.data); // handle successful response
                console.log("Emails enviadoooooos")    
            })
            .catch(error => {
            console.error(error);
            // handle error here
            });
            })
            .catch(error => {
            console.error(error);
            });
        
    }

    function sendNotGroupEventUpdate(event_name){
        axios.get(`/group/${event_name}`)
                .then(response => {
                    console.log(response.data);
                    // handle group response here
                    //adicionar utilizador ao grupo
                    const groupId = response.data.id; 
                    const data = {
                        groupId: groupId,
                        subject: 'Evento Atualizado!',
                        message: `O evento ${event_name} foi Atualizado! Check it out!`
                      };
                      
                    axios.post('/groupnotification', data)
                    .then(response => {
                        console.log('API response:', response.data);
                    })
                    .catch(error => {
                        console.error('API error:', error);
                    });

                })
                .catch(error => {
                    console.error(error);
                    // handle error here
                });
    }

    function deleteGroup(event_name){
        axios.get(`/group/${event_name}`)
                .then(response => {
                    console.log(response.data);
                    // handle group response here
                    //adicionar utilizador ao grupo
                    const groupId = response.data.id; 
                    axios
                        .delete(`/group/${groupId}`)
                        .then(response => {
                        console.log(response.data);
                        // handle response data here
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
    }


    return (  
    <>
        <div style={{display: "flex", justifyContent: "space-between", marginTop:"50px"}}>
            <div style={{flex: 1}}>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit} style={{flex: 1, marginRight: "200px", marginTop:"30px"}}>
                <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="location">location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    <option value="concert">Concert</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="sport">Sport</option>
                </select>
                </div>
                <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="capacity">Capacity:</label>
                <input
                    type="number"
                    id="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="tickets">Tickets:</label>
                <button type="button" onClick={handleAddTicket}>Add Ticket</button>
                {tickets.map((ticket, index) => (
                    <div key={index}>
                    <input type="text" name="type" placeholder="Type" value={ticket.type} onChange={(e) => handleTicketChange(index, e)} />
                    <input type="number" name="price" placeholder="Price" value={ticket.price} onChange={(e) => handleTicketChange(index, e)} />
                    <button type="button" onClick={() => handleTicketRemove(index)}>Remove</button>
                    </div>
                ))}
                </div>
                <button className="btn" type="submit">Submit</button>
            </form>
            </div>
            <div style={{flex: 1}}>
            <h1>Update Event</h1>
            <form onSubmit={handleUpdate} style={{flex: 1, marginLeft: "30px", marginTop:"30px"}}> 
            <div>
                <label htmlFor="eventId">ID of the event to update:</label>
                <input
                type="text"
                id="eventId"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="name2">Name:</label>
                <input
                type="text"
                id="name2"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="location2">Location:</label>
                <input
                type="text"
                id="location2"
                value={location2}
                onChange={(e) => setlocation2(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="category2">Category:</label>
                <select
                id="category2"
                value={category2}
                onChange={(e) => setCategory2(e.target.value)}
                >
                <option value="">Select a category</option>
                <option value="concert">Concert</option>
                <option value="entertainment">Entertainment</option>
                <option value="sport">Sport</option>
                </select>
            </div>
            <div>
                <label htmlFor="description2">Description:</label>
                <textarea
                id="description2"
                value={description2}
                onChange={(e) => setDescription2(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="date2">Date:</label>
                <input
                type="date"
                id="date2"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="capacity2">Capacity:</label>
                <input
                type="number"
                id="capacity2"
                value={capacity2}
                onChange={(e) => setCapacity2(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="tickets2">Tickets:</label>
                <button type="button" onClick={handleAddTicket2}>Add Ticket</button>
                {tickets2.map((ticket2, index2) => (
                    <div key={index2}>
                    <input type="text" name="type" placeholder="Type" value={ticket2.type} onChange={(e) => handleTicketChange2(index2, e)} />
                    <input type="number" name="price" placeholder="Price" value={ticket2.price} onChange={(e) => handleTicketChange2(index2, e)} />
                    <button type="button" onClick={() => handleTicketRemove2(index2)}>Remove</button>
                    </div>
                ))}
                </div>
            <button className="btn" type="submit">Update</button>
            </form> 
        </div>
        </div>
        <div style={{textAlign: "center", marginTop:"30px"}}>
        <h1>Delete Event</h1>
        <form onSubmit={handleDelete} style={{marginTop: "30px", marginBottom:"50px"}}>
                <div>
                <label htmlFor="eventId">ID of the event to delete:</label>
                <input
                    type="text"
                    id="eventId"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                />
                </div>
                <button className="btn" type="submit">Delete</button>
        </form>
        </div>
        
    </>
    );
}

export default EventoForm;