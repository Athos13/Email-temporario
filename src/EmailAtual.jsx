import React, { useRef } from "react";
import SgvNotificar from "./SvgNotificar";

const EmailAtual=({estadoEmail,estadoNotifica,setValorNotifica})=>{
  const inputEmail = useRef()

    function copiar(){
      inputEmail.current.select()
      document.execCommand("copy")
    }

    function alteraPermiNotifi(){
      setValorNotifica((estadoNotifica)=>!estadoNotifica)
      
    }

return <div className="EmailAtual-container">
            <h2 className="EmailAtual-h2">Seu Email Temporário é:</h2>

          {estadoEmail ?
          <label> Email:
          <input ref={inputEmail} className="textoEmail" value={estadoEmail.introduceSession.addresses[0].address}
           onChange={()=>{estadoEmail.introduceSession.addresses[0].address}} readOnly/>
          </label>
          :
           <span>Nenhum email ainda</span>
          }  

           {estadoEmail && <button className="copiar-email" onClick={copiar}>COPIAR</button>}

           <button className="notificar-email" style={estadoNotifica?{color:"green"}:{color:"#940000"}}
            onClick={alteraPermiNotifi} aria-label="botão de notificações">
             <div className="notificar-container-svg">
                  NOTIFICAR
                  <SgvNotificar color={estadoNotifica? "green":"black"}></SgvNotificar>
              </div> 
            </button>
        </div>
   
}

export default EmailAtual;