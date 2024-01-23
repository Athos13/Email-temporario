import React, { useRef } from "react";

const EmailAtual=({estadoEmail,estadoNotifica,setValorNotifica})=>{
  const inputEmail = useRef()

    function copiar(){
      inputEmail.current.select()
      document.execCommand("copy")
    }

    function alteraPermiNotifi(){
      setValorNotifica((estadoNotifica)=>!estadoNotifica)
      console.log(estadoNotifica)
    }

return <div>
            <h3 >Seu Email Temporário é:</h3>

          {estadoEmail ?<input ref={inputEmail} className="textoEmail" value={estadoEmail.introduceSession.addresses[0].address}
           onChange={()=>{estadoEmail.introduceSession.addresses[0].address}}/>
          :
           <span>Nenhum email ainda</span>
          }  

           {estadoEmail && <button onClick={copiar}>Copiar email</button>}

           <button style={estadoNotifica?{color:"green"}:{color:"red"}}
            onClick={alteraPermiNotifi}>
            Notificação {estadoNotifica? "ativada":"desativada"}
            </button>
        </div>
   
}

export default EmailAtual;