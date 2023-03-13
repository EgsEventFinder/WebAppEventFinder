import './notifications.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagem from '../../img/nots.png';

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const email = localStorage.getItem("email");

    useEffect(() => {
        axios.get(`http://localhost:3003/notifications/${email}`)
        .then(response => setNotifications(response.data))
        .catch((error) => {
            console.log(error);
        });
    }, [email]);

    return (  
        <>  
            <div className = "home_container">
                <h1>Notifications </h1>
            </div>
            <div className = "container_body">
                
                {notifications.map(not => (
                <div className="notifications__item">
                    <div className="notifications__item__avatar">
                        {/* <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049__340.png" /> */}
                        <img src={imagem} />
                    </div>

                    <div className="notifications__item__content">
                        <span className="notifications__item__title">{not.subject}</span>
                        <span className="notifications__item__message">{not.message}</span>
                        <span className="notifications__item__data">{not.created_at}</span>
                    </div>

                    <div>
                        <div className="notifications__item__option archive js-option">
                        <i className="fas fa-folder"></i>
                        </div>
                        <div className="notifications__item__option delete js-option">
                        <i className="fas fa-trash"></i>
                        </div>
                    </div>
                    </div>
                ))}      
            </div>
        </>
    );
}

export default Notifications;