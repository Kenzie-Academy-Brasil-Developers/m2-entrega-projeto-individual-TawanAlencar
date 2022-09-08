import { Api } from "./api.js"

class Cadastrar{
    static renderCadastro(){
        const formCadastro      = document.querySelector(".container_cadastro")
        const buttonCadastro    = document.querySelector('.cadastrar')
        const inputNome         = document.querySelector('#nome')
        const inputEmail        = document.querySelector('#email')
        const inputSenha        = document.querySelector('#senha')
        const select            = document.querySelector('#nivel')
        const buttonIrLogin     = document.querySelector(".cadastro button")
        formCadastro.addEventListener('submit',async (event)=>{
            event.preventDefault()
            const dados = {
                password            : inputSenha.value,
                email               : inputEmail.value,
                professional_level  : select.value,
                username            : inputNome.value,
            
            }
            await Api.fazerCadastro(dados)
            setTimeout(()=>{
            location.replace("/index.html")  
            },3000) 
        })
        buttonIrLogin.addEventListener("click", async (event)=>{
            event.preventDefault()
            location.replace("/index.html")
        })
    }
}

Cadastrar.renderCadastro()