import axios from 'axios';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from './components/pages/Home'
import Eventos from './components/pages/Eventos'
import Contactos from './components/pages/Contactos'
import Login from './components/pages/Login'
import Container from './components/layouts/Container'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/footer'
import CriarConta from './components/pages/CriarConta'
import Notifications from './components/pages/Notifications'
import Tickets from './components/pages/Tickets'
import EventManagement from './components/pages/EventManagement'
import Protected from "./components/pages/Protected";
import MyTickets from './components/pages/MyTickets'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check for access token in local storage
    const accessToken = localStorage.getItem("accessToken");
    return Boolean(accessToken);
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(Boolean(accessToken));
  }, []);

  function handleLogin(isAuthenticated) {
    setIsAuthenticated(isAuthenticated);
  }

  function handleLogout() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.delete('/logout', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(response => {
        console.log(response.data.msg); // "User loggout successfully!"
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      })
      .catch(error => {
        console.log(error.response.data); // handle error response
        setIsAuthenticated(false);
      });
    } else {
      setIsAuthenticated(false);
      console.log("Access token not found in localStorage");
    }
  }

 

  return (
  <>
    
    
    <BrowserRouter>
    <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
  
      <Container>
        <Routes>
            
            <Route exact path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
            <Route exact path="/events" element={<Eventos />} />
            <Route exact path="/contacts" element={<Contactos />} />
            <Route exact path="/login" element={<Login onLogin={handleLogin} />} />
            <Route exact path="/createAccount" element={<CriarConta />} />
            <Route exact path="/notifications" element={<Protected isAuthenticated={isAuthenticated}> <Notifications onChange={handleLogin}/> </Protected>} />
            <Route path="/eventsManagement" element={<Protected isAuthenticated={isAuthenticated}> <EventManagement onChange={handleLogin}/> </Protected>} />
            <Route path="/tickets/:id" element={<Protected isAuthenticated={isAuthenticated}> <Tickets onChange={handleLogin} onLogout={handleLogout}/> </Protected>} />
            <Route path="/myTickets" element={<Protected isAuthenticated={isAuthenticated}> <MyTickets onChange={handleLogin}/> </Protected>} />
        </Routes>
      </Container>
    <Footer/>
    </BrowserRouter>

  </>   
  );
}

export default App;
