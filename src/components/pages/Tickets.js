import './tickets.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
 

function Tickets() {
    
    
    const { id } = useParams();

    const [data, setData] = useState([]);

    let nome;

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/event/${id}/tickets`)
          .then(response => setData(response.data))
          .catch(error => console.log(error));
    }, []);


    //usar método para ir buscar nome do evento, dando o evento id
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/events/')
          .then(response => setEvents(response.data))
          .catch(error => console.log(error));
    }, []);


    return ( 
        <>
            <div className = "home_container">
                <h1>Types of Tickets Available </h1>
            </div>
            <div className = "container_body">
                {data.map(data2 => (
                <div className="item" key={data2.ticket_id}>
                    <div className="item-right">
                    <h2 className="num">{data2.type}</h2>
                    <p className="day">{data2.price}€</p>
                    <span className="up-border"></span>
                    <span className="down-border"></span>
                    </div> 
                    
                    <div className="item-left">
                    <p className="event">Music Event</p>
                    <h2 className="title">Live In Sydney</h2>
                    
                    <div className="sce">
                        <div className="icon">
                        <i className="fa fa-table"></i>
                        </div>
                        <p>Monday 15th 2016 <br/> 15:20Pm & 11:00Am</p>
                    </div>
                    <div className="fix"></div>
                    <div className="loc">
                        <div className="icon">
                        <i className="fa fa-map-marker"></i>
                        </div>
                        <p>North,Soth, United State , Amre <br/> Party Number 16,20</p>
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