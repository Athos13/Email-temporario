import React from "react";
import EmailRecebidoItem from "./EmailRecebidoItem";

const EmailsRecebidos = ({meusEmails})=>{
    
    return <ul className="listaEmail">
        <li><h3>Emails recebidos:</h3></li>
        {meusEmails.length !== 0 ? meusEmails.map((item,index)=>
          <>
                <EmailRecebidoItem key={index} titulo={item.headerSubject}
                autor={item.fromAddr} conteudo={item.text}/>
          </>      
            ):
            <li><p>Nenhum email recebido ainda</p></li>
        }
        
    </ul>
    
}

export default EmailsRecebidos;