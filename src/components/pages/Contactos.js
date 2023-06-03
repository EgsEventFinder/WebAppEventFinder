import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import imagem from '../../img/evento.jpg';
import axios from 'axios';

import './contactos.css';

function Contactos() {

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // get token from localStorage
        console.log(token)
        axios.get('http://app-authentication.deti/verifyToken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Token Válido");
        })
        .catch(error => {
          console.log(error);
          localStorage.removeItem("accessToken");
          //window.location.href = 'http://localhost:3000';
        });
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:eventfinderteste@gmail.com?subject=${encodeURIComponent(`Email from ${name} (${email})`)}&body=${encodeURIComponent(message)}`;
  };
  return (
    <div className="contact-page">
      <div className="contact-page__header">
      <img src={imagem} alt="Event banner" />
      </div>
      <div className="contact-page__content">
        <div className="contact-page__social-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
        <h2>Contact Us</h2>
        <p>Have questions, suggestions or just want to say hello? Use the form below to send us an email!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contactos;