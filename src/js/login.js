import { Api } from "./api.js"
class Login{
    static renderLogin(){
        const buttonLogin       = document.querySelector(".login")
        const inputEmail        = document.querySelector('.email')
        const inputSenha        = document.querySelector('.senha')
        const buttonIrCadastro  = document.querySelector('.ir_cadastro')
        const buttonHome        = document.querySelector("header button")
        buttonLogin.addEventListener('click',(event)=>{
            event.preventDefault()
            const dados = {
                email:      inputEmail.value,
                password:   inputSenha.value
            }
            
            Api.fazerLogin(dados)
           /*  setTimeout(()=>{
                location.replace("./src/pages/homepage.html")  
                },3000)  */
        })

        buttonIrCadastro.addEventListener("click",(event)=>{
            event.preventDefault()
            location.replace("./src/pages/cadastro.html") 
        })

        buttonHome.addEventListener("click",(event)=>{
            event.preventDefault()
            location.replace("./src/pages/homepage.html")
        })

    }
}
Login.renderLogin()