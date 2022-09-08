import { Api } from "./api.js";

class Render{
    static async renderLista(request){
        const {data}       = await request
        const ulLista      = document.querySelector(".container_lista_empresa")
        ulLista.innerText = ""
        data.forEach(element=>{
            const liEmpresa         =   document.createElement("li")
            const h2EmpresaNome     =   document.createElement("h2")
            const pEmpresaDescricao =   document.createElement("P")
            const pSetor            =   document.createElement("p")
            const spanHorario       =   document.createElement("span")
            const divEmpresa        =   document.createElement("div")
            const divInfoEmpresa    =   document.createElement("div")
            
            divEmpresa.className            =   "lista_empresa_texto"
            divInfoEmpresa.className        =   "informacoes_da_empresa"

            pSetor.innerText                =   `Setor: ${element.sectors.description}`
            pEmpresaDescricao.innerText     =   element.description
            h2EmpresaNome.innerText         =   element.name
            spanHorario.innerText           =   `Abre as: ${element.opening_hours} horas`

            divInfoEmpresa.append(pEmpresaDescricao,pSetor,spanHorario)
            divEmpresa.append(h2EmpresaNome,divInfoEmpresa)
            liEmpresa.append(divEmpresa)
            ulLista.append(liEmpresa)
        })
        
    }

    static irLogin(){
        const buttonLogin   = document.querySelector("#login")
        buttonLogin.addEventListener("click",(event)=>{
            event.preventDefault()
            location.replace("/index.html")
        })
    }

    static irCadastro(){
        const buttonCadastro  = document.querySelector("#cadastro")
        buttonCadastro.addEventListener("click",(event)=>{
            event.preventDefault()
            location.replace("./cadastro.html")
        })
    }
    static selecionarEmpresa(){
        const select = document.querySelector("select")
        select.onchange = ()=>{
            Render.renderLista( Api.listarEmpresasSetor(select.value))
    
        }
    }  
}
Render.irCadastro()
Render.selecionarEmpresa()
Render.renderLista(Api.listarEmpresas())
Render.irLogin()
