import { Api } from "./api.js"
class Login{
    static renderLogin(){
        const buttonLogin  = document.querySelector(".login")
        const inputEmail   = document.querySelector('.email')
        const inputSenha   = document.querySelector('.senha')

        buttonLogin.addEventListener('click',(event)=>{
            event.preventDefault()
            const dados = {
                email:      inputEmail.value,
                password:   inputSenha.value
            }
            
            Api.fazerLogin(dados)

        })
    }
}
Login.renderLogin()