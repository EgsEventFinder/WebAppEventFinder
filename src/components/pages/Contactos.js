import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import imagem from '../../img/evento.jpg';
import axios from 'axios';

import './contactos.css';

function Contactos() {

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // get token from localStorage
        console.log(token)
        axios.get('http://127.0.0.1:5001/verifyToken', {
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
        <h2>Contacte-nos</h2>
        <p>Tem dúvidas, sugestões ou apenas quer dizer olá? Use o formulário abaixo para nos enviar um email!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensagem:</label>
            <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Contactos;