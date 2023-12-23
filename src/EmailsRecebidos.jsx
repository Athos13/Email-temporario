import React from "react";
import EmailRecebidoItem from "./EmailRecebidoItem";

const EmailsRecebidos = ({meusEmails})=>{
    
    return <ul className="listaEmail">
        <h3>Emails recebidos:</h3>
        {meusEmails.length !== 0 ? meusEmails.map((item,index)=>
          <>
                <EmailRecebidoItem key={index} titulo={item.headerSubject}
                autor={item.fromAddr} conteudo={item.text}/>
          </>      
            ):
            <p>Nenhum email recebido ainda</p>
        }
        
    </ul>
    
}

export default EmailsRecebidos;