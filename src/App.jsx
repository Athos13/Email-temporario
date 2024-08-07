import React from 'react';
import Header from './Header';
import Footer from './Footer';
import EmailAtual from './EmailAtual';
import EmailsRecebidos from './EmailsRecebidos';
import EmailSelecionado from './EmailSelecionado';
import { DadosGlobais } from './ContextoGlobal';
import "./App.css";

const App = () => {
  const [email, setEmail] = React.useState(null);
  const [emailRecebidos, setEmailRecebidos] = React.useState([])
  const [notificar, setNotificar] = React.useState(false)


function salvaLocalStorage(data){
  setEmail(data)
  window.localStorage.setItem("email",JSON.stringify(data))
}

function testaValidadeSession(dadosSession){
  const buscaEmails = async ()=>{
    const requisicao = fetch("https://dropmail.p.rapidapi.com/",{
      method:"POST",
      headers:{  
        'x-rapidapi-key': '285c294c94mshf770cfd187a1f57p1fe799jsn1d9c38023f31',
        'x-rapidapi-host': 'dropmail.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        query:`{
        session(id: "${dadosSession.introduceSession.id}") {
            mails{
                rawSize,
                fromAddr,
                toAddr,
                downloadUrl,
                text,
                headerSubject
            }
        }
    }`
      })  
    })
    let resposta = await requisicao
    let respostaJson = await resposta.json()
    
    if(resposta.status == 200 && !respostaJson.errors){
      setEmail(dadosSession)
    }else{
      criaNovaSession()
    }
  }
 buscaEmails()
}




async function criaNovaSession(){
    const requisicao = fetch("https://dropmail.p.rapidapi.com/",{
          method:"POST",
          headers:{  
            'x-rapidapi-key': '285c294c94mshf770cfd187a1f57p1fe799jsn1d9c38023f31',
            'x-rapidapi-host': 'dropmail.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            query:`mutation{
              introduceSession {
                id, 
                expiresAt, 
                addresses{
                  address,
                }
              }}`
            })
        })

        const resposta = await requisicao
        const respostaJson = await resposta.json()
        
        if(resposta.status == 200 && !respostaJson.errors){
          salvaLocalStorage(respostaJson.data)
        }else{
          alert("Houve um erro. Recarregue a página ou volte mais tarde.")
        }
        
   }


React.useEffect(()=>{
      
      let dadosLocal = window.localStorage.getItem("email");
      let dadosLocalJson = JSON.parse(dadosLocal);
      if(dadosLocal){
        testaValidadeSession(dadosLocalJson)
      }else{
        criaNovaSession()
      }
},[])

   
React.useEffect(()=>{ 
  let intervalo
  if(email){
      intervalo=setInterval(()=>{
          const buscaEmails = async ()=>{
            const requisicao = fetch("https://dropmail.p.rapidapi.com/",{
              method:"POST",
              headers:{  
                'x-rapidapi-key': '285c294c94mshf770cfd187a1f57p1fe799jsn1d9c38023f31',
                'x-rapidapi-host': 'dropmail.p.rapidapi.com',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                query:`{
                session(id: "${email.introduceSession.id}") {
                    mails{
                        rawSize,
                        fromAddr,
                        toAddr,
                        downloadUrl,
                        text,
                        headerSubject
                    }
                }
            }`
              })  
            })
            let resposta = await requisicao
            let respostaJson = await resposta.json()
            let respostaDadoFinal = await respostaJson.data.session.mails

            if(resposta.status == 200 && !respostaJson.errors){
              setaEmailsRecebidos(respostaDadoFinal)
            }
            else{
              clearInterval(intervalo)
              criaNovaSession()
            }
            
        }        
          buscaEmails()
      },[15000])
    
      
  }
},[email])



function setaEmailsRecebidos(respostaDadoFinal){
  //seta emailRecebidos com responseJson se o tamanho tiver mudado(tenho novos emails)
  setEmailRecebidos((prev)=>{
    if(prev.length !== respostaDadoFinal.length){
      return respostaDadoFinal
    }else{
      return prev
    }
  })
}

React.useEffect(()=>{
// se aba está em foco, se estado não estiver vazio, se suportar notificação e permissão não foi negada
// peço para notificar  e crio a notificação

    if(document.hasFocus()===false){
    if(emailRecebidos.length !== 0){
      if(window.Notification && Notification.permission!=="denied"){
          Notification.requestPermission()

          if(Notification.permission==="granted" && notificar){
            new Notification('Tempmail',{
            body:"Você recebeu novos emails!"
            })
          }else if(Notification.permission==="granted" && notificar===false){
            alert("As permissões de notificação estão aceitas mas você não ativou o sino")
          }
       
      }
    }
  }
},[emailRecebidos])



  return <div className='container-geral'>
     <Header/>
     <EmailAtual estadoEmail={email} estadoNotifica={notificar} setValorNotifica={setNotificar}/>
     <DadosGlobais>
     <div className='container-recebidos_selec'>
        <EmailsRecebidos meusEmails={emailRecebidos} /> 
        <EmailSelecionado idSessao={email}/>
     </div>
     </DadosGlobais>
     <Footer/>
  </div>
  
};

export default App;