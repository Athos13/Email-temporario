import React, { useRef } from "react";

const EmailAtual=({estadoEmail})=>{
  const inputEmail = useRef()

    function copiar(){
      inputEmail.current.select()
      document.execCommand("copy")
    }


return <div>
            <h3 >Seu Email Temporário é:</h3>

          {estadoEmail ?<input ref={inputEmail} className="textoEmail" value={estadoEmail.introduceSession.addresses[0].address}
           onChange={()=>{estadoEmail.introduceSession.addresses[0].address}}/>
          :
           <span>Nenhum email ainda</span>
          }  

           {estadoEmail && <button onClick={copiar}>Copiar email</button>}
           <button>Notificação</button>
        </div>
   
}

export default EmailAtual;