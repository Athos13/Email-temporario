import React from "react";
import { ContextoGlobal } from "./contextoGlobal";

const EmailRecebidoItem = ({titulo,autor,conteudo})=>{
    const global = React.useContext(ContextoGlobal)

    function selecionaComEnter(event){
        if(event.key==='Enter'){
            global.setEmailGlobal({titulo, autor, conteudo})
        }
    }

    return <li className="divEmail"
    tabIndex={0} 
    onClick={()=>{global.setEmailGlobal({titulo, autor,conteudo})}}
    onKeyDown={selecionaComEnter}
    >
        <h4>{titulo}</h4>
        <span>Autor: {autor}</span>
        <p>{conteudo}</p>
    </li>
}

export default EmailRecebidoItem;