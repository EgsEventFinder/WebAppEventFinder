import './eventoForm.css'
import React, { useState} from 'react';
import axios from 'axios';

function EventoForm() {

    //constantes para adicionar evento ou atualizar
    const [name, setName] = useState('');
    const [localization, setLocalization] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [capacity, setCapacity] = useState('');

    //constante para remover evento
    const [eventId, setEventId] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: submit form data to server or perform some other action

        const formData = new FormData();
        formData.append('name', name);
        formData.append('localization', localization);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('capacity', capacity);

        // make POST request to API endpoint
        axios.post('http://127.0.0.1:8000/', formData)
        .then(response => {
            console.log(response.data);
            // TODO: handle successful response from API
        })
        .catch(error => {
            console.error(error);
            // TODO: handle error from API
        });
    };

    const handleDelete = (event) => {
        event.preventDefault();
        console.log(eventId);
        // TODO: send the event ID to the server to delete the event using axios
      };

    const handleUpdate = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('localization', localization);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('capacity', capacity);
        const eventIdToUpdate = eventId;

        // make PUT request to API endpoint
        axios.put(`http://127.0.0.1:8000/${eventIdToUpdate}`, formData)
        .then(response => {
            console.log(response.data);
            // TODO: handle successful response from API
        })
        .catch(error => {
            console.error(error);
            // TODO: handle error from API
        });
    };


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
                <label htmlFor="localization">Localization:</label>
                <input
                    type="text"
                    id="localization"
                    value={localization}
                    onChange={(e) => setLocalization(e.target.value)}
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
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="localization">Localization:</label>
                <input
                type="text"
                id="localization"
                value={localization}
                onChange={(e) => setLocalization(e.target.value)}
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
            <button className="btn" type="submit">Update</button>
            </form> 
        </div>
        </div>
        <div style={{textAlign: "center", marginTop:"30px"}}>
        <h1>Delete Event</h1>
        <form onSubmit={handleDelete} style={{marginTop: "20px", marginTop: "30px", marginBottom:"50px"}}>
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