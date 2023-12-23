import React from 'react';
import Header from './Header';
import Footer from './Footer';
import EmailAtual from './EmailAtual';
import EmailsRecebidos from './EmailsRecebidos';
import EmailSelecionado from './emailSelecionado';
import { DadosGlobais } from './contextoGlobal';
import "./App.css";

const App = () => {
  const [email, setEmail] = React.useState(null);
  const [emailRecebidos, setEmailRecebidos] = React.useState([])
//O QUE ESTOU USANDO ATUALMENTE
// React.useEffect(()=>{ 
  
//   let intervalo
//     if(email){
//         intervalo=setInterval(()=>{
//           fetch("https://dropmail.p.rapidapi.com/",{
//           method:"POST",
//           headers:{  
//             'x-rapidapi-key': '285c294c94mshf770cfd187a1f57p1fe799jsn1d9c38023f31',
//             'x-rapidapi-host': 'dropmail.p.rapidapi.com',
//             'Content-Type': 'application/json'
//           },
//           body:JSON.stringify({
//             query:`{
//             session(id: "${email.introduceSession.id}") {
//                 mails{
//                     rawSize,
//                     fromAddr,
//                     toAddr,
//                     downloadUrl,
//                     text,
//                     headerSubject
//                 }
//             }
//         }`
//             })
//         })
//         .then((response)=>response.json())
//         .then((json)=>json.data)
//         .then((data)=> setEmailRecebidos(data.session.mails))
//         .catch(err => console.log(err.message))
//     },[15000])

//       setTimeout(()=>{
//         clearInterval(intervalo)
//       },[80000])
//     }
// },[email])


// React.useEffect(()=>{
//   //se aba está em foco, se estado não estiver vazio, se suportar notificação e permissão não foi negada
//   // peço para notificar  e crio a notificação
//   if(document.hasFocus()===false){
//     if(emailRecebidos.length !== 0){
//       if(window.Notification && Notification.permission!=="denied"){
//         Notification.requestPermission(function(status){
//             let notificacao = new Notification('Email temporario',{
//             body:"Você recebeu novos emails!"
//           })
//         })
//       }
//     }
//   }
  
// },[emailRecebidos])

//NESSES COMENTÁRIOS TENTEI FAZER O ESTADO DOS EMAIL SÓ SER ALTERADO SE HOUVER NOVOS EMAIL E SÓ NOTIFICAR SE HOUVER NOVOS TBM
// React.useEffect(()=>{ 
//   let intervalo
// if(email){
//       intervalo=setInterval(()=>{
//         const buscaEmails = async ()=>{
//             const requisicao = fetch("https://dropmail.p.rapidapi.com/",{
//               method:"POST",
//               headers:{  
//                 'x-rapidapi-key': '285c294c94mshf770cfd187a1f57p1fe799jsn1d9c38023f31',
//                 'x-rapidapi-host': 'dropmail.p.rapidapi.com',
//                 'Content-Type': 'application/json'
//               },
//               body:JSON.stringify({
//                 query:`{
//                 session(id: "${email.introduceSession.id}") {
//                     mails{
//                         rawSize,
//                         fromAddr,
//                         toAddr,
//                         downloadUrl,
//                         text,
//                         headerSubject
//                     }
//                 }
//             }`
//               })  
//             })
//             let resposta = await requisicao
//             let respostaJson = await resposta.json()
//             let respostaDadoFinal = await respostaJson.data.session.mails
//             setaEmailsRecebidos(respostaDadoFinal)
//         }
                  
//           buscaEmails()
//       },[15000])
  
//         setTimeout(()=>{
//           clearInterval(intervalo)
//         },[80000])
// }
// },[email])



//DAQUI TEMOS DUAS OPÇÕES:
//( notificando mesmo quando não existem novos)

// function disparaNotificacao(){
//   if(!document.hasFocus()){
//     if(emailRecebidos.length !== 0){
//       if(window.Notification && Notification.permission!=="denied"){
//         Notification.requestPermission(function(status){
//             let notificacao = new Notification('Email temporario',{
//             body:"Você recebeu novos emails!"
//           })
//         })
//       }
//     }
//   }
// }

// function setaEmailsRecebidos(respostaDadoFinal){
//   //seta emailRecebidos com responseJson se o tamanho tiver mudado(tenho novos emails)
//   if(emailRecebidos.length !== respostaDadoFinal.length){
//     setEmailRecebidos(respostaDadoFinal)
//     disparaNotificacao()
//   }
// }



// OU ESSA OPÇÃO(também notificando mesmo quando não existem novos):

// function setaEmailsRecebidos(respostaDadoFinal){
//   //seta emailRecebidos com responseJson se o tamanho tiver mudado(tenho novos emails)
//   if(emailRecebidos.length !== respostaDadoFinal.length){
//     setEmailRecebidos(respostaDadoFinal)
//   }
// }

// React.useEffect(()=>{
//se aba está em foco, se estado não estiver vazio, se suportar notificação e permissão não foi negada
// peço para notificar  e crio a notificação

//     if(document.hasFocus()===false){
//     if(emailRecebidos.length !== 0){
//       if(window.Notification && Notification.permission!=="denied"){
//         Notification.requestPermission(function(status){
//             let notificacao = new Notification('Email temporario',{
//             body:"Você recebeu novos emails!"
//           })
//         })
//       }
//     }
//   }
// },[emailRecebidos])



React.useEffect(()=>{
        fetch("https://dropmail.p.rapidapi.com/",{
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
      .then((response)=>response.json())
      .then(json => json.data)
      .then((data) => setEmail(data))
      .catch(err => console.log(err.message))
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
            setaEmailsRecebidos(respostaDadoFinal)
        }
                  
          buscaEmails()
      },[15000])
  
        setTimeout(()=>{
          clearInterval(intervalo)
        },[80000])
}
},[email])

function setaEmailsRecebidos(respostaDadoFinal){
  //seta emailRecebidos com responseJson se o tamanho tiver mudado(tenho novos emails)
  if(emailRecebidos.length !== respostaDadoFinal.length){
    setEmailRecebidos(respostaDadoFinal)
  }
}

React.useEffect(()=>{
// se aba está em foco, se estado não estiver vazio, se suportar notificação e permissão não foi negada
// peço para notificar  e crio a notificação

    if(document.hasFocus()===false){
    if(emailRecebidos.length !== 0){
      if(window.Notification && Notification.permission!=="denied"){
        Notification.requestPermission(function(status){
            let notificacao = new Notification('Email temporario',{
            body:"Você recebeu novos emails!"
          })
        })
      }
    }
  }
},[emailRecebidos])



  return<div className='container-geral'>
     <Header/>
     <EmailAtual estadoEmail={email} />
     <DadosGlobais>
     <div style={{minHeight:"400px",border:"solid 2px yellow", display:"grid", gridTemplateColumns:"300px 1fr", gap:"12px"}}>
        <EmailsRecebidos meusEmails={emailRecebidos} /> 
        <EmailSelecionado/>
     </div>
     </DadosGlobais>
     <Footer/>
  </div>
};

export default App;