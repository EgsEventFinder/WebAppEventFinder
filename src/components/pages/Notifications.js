import './notifications.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagem from '../../img/nots.png';

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get('/send-email')
          .then(response => setNotifications(response.data))
          .catch(error => console.log(error));
    }, []);

    return (  
        <>  
            <div className = "home_container">
                <h1>Notifications </h1>
            </div>
            <div className = "container_body">
                
                {notifications.map(not => (
                <div class="notifications__item">
                    <div class="notifications__item__avatar">
                        {/* <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049__340.png" /> */}
                        <img src={imagem} />
                    </div>

                    <div class="notifications__item__content">
                        <span class="notifications__item__title">{not.subject}</span>
                        <span class="notifications__item__message">{not.message}</span>
                    </div>

                    <div>
                        <div class="notifications__item__option archive js-option">
                        <i class="fas fa-folder"></i>
                        </div>
                        <div class="notifications__item__option delete js-option">
                        <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    </div>
                ))}      
            </div>
        </>
    );
}

export default Notifications;