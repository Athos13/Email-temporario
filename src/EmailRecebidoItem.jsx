import React from "react";
import { ContextoGlobal } from "./ContextoGlobal";

const EmailRecebidoItem = ({titulo,autor,conteudo})=>{
    const global = React.useContext(ContextoGlobal)

    function selecionaComEnter(event){
        if(event.key==='Enter'){
            global.setEmailGlobal({titulo, autor, conteudo})
            global.setModal(true)
        }
    }

    return <li className="divEmail"
    tabIndex={0} 
    onClick={()=>{
        global.setEmailGlobal({titulo, autor,conteudo})
        global.setModal(true)
    }}
    onKeyDown={selecionaComEnter}
    >
        <h3>{titulo}</h3>
        <span>Autor: {autor}</span>
        <p>{conteudo}</p>
    </li>
}

export default EmailRecebidoItem;