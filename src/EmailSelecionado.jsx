import React from "react";
import { ContextoGlobal } from "./contextoGlobal";

const EmailSelecionado = ({idSessao})=>{
    const global = React.useContext(ContextoGlobal)
    const [mobile, setMobile]=React.useState(false)

    function testaSeMobile(){
      const media = window.matchMedia("(max-width: 780px)")
      if(media.matches){
        setMobile(true)
      }else{
        setMobile(false)
      }
    }
    window.addEventListener('resize',testaSeMobile)
    // const [arquiSessao, setArquiSessao] = React.useState(null) 

    // React.useEffect((idSessao)=>{
    //         if(global.emailGlobal){
    //             const buscaArquiDownLoad = async ()=>{
    //                 const requisicao = fetch("https://dropmail.p.rapidapi.com/",{
    //                   method:"POST",
    //                   headers:{  
    //                     'x-rapidapi-key': '285c294c94mshf770cfd187a1f57p1fe799jsn1d9c38023f31',
    //                     'x-rapidapi-host': 'dropmail.p.rapidapi.com',
    //                     'Content-Type': 'application/json'
    //                   },
    //                   body:JSON.stringify({
    //                     query:`{
    //                     session(id:"${idSessao && idSessao.introduceSession.id}") {
    //                         mails {
    //                             attachments {
    //                               downloadUrl
    //                               id
    //                               mime
    //                               name
    //                               raw
    //                               rawSize
    //                             }
    //                           }
    //                     }
    //                 }`
    //                   })  
    //                 })
    //                 let resposta = await requisicao
    //                 let respostaJson = await resposta.json()
    //                 let respostaDadoFinal = await respostaJson
    //                 setArquiSessao(respostaDadoFinal)
    //                 console.log(arquiSessao)
    //             }
                          
    //             buscaArquiDownLoad()
    //         }
    //     },[global])

    return <React.Fragment>
        {global.emailGlobal!== null ?
        <div className="EmailSelecionado-container"
        tabIndex={0} 
        style={global.modal===true || !mobile? 
        {display:"flex"}:
        {display:"none"}}>
            <button className="EmailSelec-fechar" 
            onClick={()=>{global.setModal(false)}}>FECHAR</button>
            <h4>{global.emailGlobal.titulo}</h4>
            <span> Autor: {global.emailGlobal.autor}</span>
            <p>{global.emailGlobal.conteudo}</p>
            <p>{idSessao && idSessao.introduceSession.id}</p>
        </div>
        :
        <p className="paragrafo-emailSelec">Selecione um email</p> //essa parte não está inclusa no EmailSelecionado-container, por isso aparece na media query
        }
    </React.Fragment>
}

export default EmailSelecionado