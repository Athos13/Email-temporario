import React from "react";
export const ContextoGlobal = React.createContext()

export const DadosGlobais = ({children})=>{
    const [emailGlobal,setEmailGlobal] = React.useState(null)

    return <ContextoGlobal.Provider value = {{emailGlobal, setEmailGlobal}}>
        {children}
    </ContextoGlobal.Provider>

}