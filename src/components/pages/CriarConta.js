import { useState } from "react";
import './login.css'
import axios from 'axios';

function CriarConta() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  function deleteErrorMessage() {
    setErrorMessage("");
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function sendDataApiNot(data) {
      
    

      const postData = {
        to: email,
        subject: "Confirm Registration",
        message: `Hi ${firstName} ${lastName}, your confirmation link is ${data}`
      };

      console.log(postData)
  
      axios.post('http://notification-api.deti/notification', postData)
        .then((response) => {
          console.log(response.data);
          window.location.href = 'http://webappfinder.deti/login';
          // do something with the response here
        })
        .catch((error) => {
          console.error(error);
          // handle the error here
        });
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não são iguais.");
      return;
    }
  
    console.log(firstName, lastName, username, email, password);
  
    const postData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    };
  
    axios.post('http://app-authentication.deti/register', postData)
      .then(response => {
        if (response.status === 200) {
          console.log("Entrou");
          console.log(response.data.link);
          sendDataApiNot(response.data.link);
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => {
        if (error instanceof TypeError) {
          // Handle network errors here
        } else {
          setErrorMessage("Conta já existe");
          console.log(error);
        }
      });
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title">Create Account</span>
            <div className="wrap-input">
              <input
                className={firstName ? "has-val input" : "input"}
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <span className="focus-input" data-placeholder="First Name"></span>
            </div>

            <div className="wrap-input">
              <input
                className={lastName ? "has-val input" : "input"}
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <span className="focus-input" data-placeholder="Last Name"></span>
            </div>

            <div className="wrap-input">
              <input
                className={username ? "has-val input" : "input"}
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
              <span className="focus-input" data-placeholder="Username"></span>
            </div>
            <div className="wrap-input">
              <input
                className={email ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="wrap-input">
              <input
                className={confirmPassword ? "has-val input" : "input"}
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span className="focus-input" data-placeholder="Confirmar senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button onClick={deleteErrorMessage} type="submit" className="login-form-btn">
                Create Account
              </button>
            </div>

            <div className="text-center">
              <span className="txt1">Already have an account? </span>
              <a className="txt2" href="/login">
                Login
              </a>
            </div>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CriarConta;