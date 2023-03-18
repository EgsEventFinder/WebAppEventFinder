import './tickets.css'
import axios from 'axios';
import { useState, useEffect } from 'react';



function MyTickets() {
    return ( 
        <>  <h1>MY TICKETS</h1>
            {/* <div className="home_container">
                <h1>My Tickets </h1>
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
                
            </div> */}
        </>
     );
}

export default MyTickets;