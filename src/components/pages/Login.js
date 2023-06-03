import { useState } from "react";
import './login.css'


function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    

    function deleteErrorMessage() {
      setErrorMessage("");
    }

    function handleSubmit(event) {
      event.preventDefault();
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      };
      
      fetch('http://app-authentication.deti/login', requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          console.log(data); // log the entire data object to the console
          //const authorizationHeader = data.Authorization;
          //const message = data.msg;
          const accessToken = data.access_token;

          // do something with the authorization header and message here
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("email", email);
          console.log("AQUI: ", accessToken)
          props.onLogin(true);
          window.location.href = '/';
          
          
        })
        .catch(error => {
          if (error instanceof TypeError) {
            // Handle network errors here
          } else {
            setErrorMessage("Credenciais Inválidas");
            console.log(error);
          }
        });
    }
    
    return ( 
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-title"> Welcome </span>
            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button onClick={deleteErrorMessage} className="login-form-btn">Login</button>
            </div>

            <div className="text-center">
              <span className="txt1">Don't have an account? </span>
              <a className="txt2" href="/createAccount">
                Create Account
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

export default Login;