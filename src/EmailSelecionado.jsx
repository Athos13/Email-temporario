import React from "react";
import { ContextoGlobal } from "./contextoGlobal";

const EmailSelecionado = ()=>{
    const global = React.useContext(ContextoGlobal)
    
    return <React.Fragment>
        {global.emailGlobal!== null ?
        <div className="EmailSelecionado-container" tabIndex={0}>
            <h4>{global.emailGlobal.titulo}</h4>
            <span> Autor: {global.emailGlobal.autor}</span>
            <p>{global.emailGlobal.conteudo}</p>
            
        </div>
        :
        <p>Selecione um email</p>
        }
    </React.Fragment>
}

export default EmailSelecionado