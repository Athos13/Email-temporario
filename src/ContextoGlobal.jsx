import React from "react";
export const ContextoGlobal = React.createContext()

export const DadosGlobais = ({children})=>{
    const [emailGlobal,setEmailGlobal] = React.useState(null)
    const [modal, setModal] = React.useState(false)

    return <ContextoGlobal.Provider value = {{emailGlobal, setEmailGlobal, modal, setModal}}>
        {children}
    </ContextoGlobal.Provider>

}