
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/pages/Home'
import Eventos from './components/pages/Eventos'
import Contactos from './components/pages/Contactos'
import Login from './components/pages/Login'
import Container from './components/layouts/Container'
import Navbar from './components/layouts/navbar'
import Footer from './components/layouts/footer'
import CriarConta from './components/pages/CriarConta'
import Notifications from './components/pages/Notifications'
import Tickets from './components/pages/Tickets'

function App() {
  return (
  <>
    
    
    <BrowserRouter>
    <Navbar/>
      <Container>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/events" element={<Eventos />} />
            <Route exact path="/contacts" element={<Contactos />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createAccount" element={<CriarConta />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route path="/tickets/:id" element={<Tickets />} />
        </Routes>
      </Container>
    <Footer/>
    </BrowserRouter>

  </>   
  );
}

export default App;
