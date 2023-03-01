import { useState } from "react";
import './login.css'

function CriarConta() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordfinal, setPasswordfinal] = useState("");
    const [passworderrada, setPassworderrada] = useState("");

    function verificarPassIgual(e){
        e.preventDefault()
        if(password === password2){
            console.log("certo")
            setPasswordfinal({password})
            setPassworderrada("")
        }
        else{
            console.log("errado")
            setPasswordfinal("")
            setPassworderrada({password2})
        }
    }

    function sucesso(){
        return(
            <div className="conta_certa">
                <p>Conta registada com sucesso!</p>
            </div>
        )    
    }

    function errado(){
        return(
            <div className="conta_certa">
                <p>Palavras passes têm de ser iguais</p>
            </div>
        )    
    }

    return ( 
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Bem vindo </span>
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

            <div className="wrap-input">
              <input
                className={password2 !== "" ? "has-val input" : "input"}
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Repita a password"></span>
            </div>

            <div className="container-login-form-btn">
              <button type="submit" className="login-form-btn" onClick={verificarPassIgual}>Criar Conta</button>
            </div>
            
            {passwordfinal && (
                sucesso()
            )
            }
            {passworderrada && (
                errado()
            )
            }

            <div className="text-center">
              <span className="txt1">Já possui conta? </span>
              <a className="txt2" href="/login">
                Fazer login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
}

export default CriarConta;