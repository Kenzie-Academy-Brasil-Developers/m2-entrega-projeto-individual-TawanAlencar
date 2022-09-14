import { Api } from "./api.js"

class DashboardNormal{
    static async logout(){
        const buttonLogout      =   document.querySelector("#sair")
        buttonLogout.addEventListener("click", (event)=>{
            event.preventDefault()
            localStorage.removeItem("@kenzieEmpresa:token")
            localStorage.removeItem("@kenzieEmoresa:tokenID")
            window.location.assign("../../index.html")
        })
    }

    static async mostrarFuncionarios(){
        const apiFuncionarios       =   await Api.funcionariosMesmoDepartamento()
        const buttonFuncionarios    =   document.querySelector("#funcionarios")
        const divFuncionarios       =   document.querySelector(".separar_funcionarios")
        const h2Departamento        =   document.querySelector(".meu_departamento")
        h2Departamento.innerText    =   `Meu departamento:${apiFuncionarios.data[0].name}`
    
        buttonFuncionarios.addEventListener("click",(event)=>{
            event.preventDefault()
            divFuncionarios.innerHTML = ""
            apiFuncionarios.data[0].users.forEach(element=>{
        
                const h3Nome            = document.createElement("h3")
                const pLevel            = document.createElement("p")
                const spanModalidade    = document.createElement("span")
                
                h3Nome.innerText                =  `Nome:${element.username}`
                pLevel.innerText                = `Nível profissional: ${element.professional_level}`
                spanModalidade.innerText        = `Modalidade: ${element.kind_of_work}`

                divFuncionarios.append(h3Nome,pLevel,spanModalidade)
            
            })
        })
    }
    static abrirDepartamentos(){
        const buttonLista           =  document.querySelector(".todos_funcionarios")
        const divLista              =  document.querySelector(".separar_funcionarios")
        const h2Nome                =  document.querySelector(".meu_departamento")
        buttonLista.addEventListener("click",(event)=>{
            event.preventDefault()
            divLista.classList.toggle("separar_funcionarios_close")
            h2Nome.classList.toggle("meu_departamento_close")
        })
    }

    static async alterarInformacoes(){
        const inputNome         =   document.querySelector(".nome_funcionario")
        const inputEmail        =   document.querySelector(".email_funcionario")
        const inputSenha        =   document.querySelector(".senha_funcionario")
        const buttonInfo        =   document.querySelector("#alterar")

        buttonInfo.addEventListener("click",async (event)=>{
            event.preventDefault()
            const dados = {
                username    :   inputNome.value,
                email       :   inputEmail.value,
                password    :   inputSenha.value
            }
            await Api.editarDados(dados)
        })
    }

    static abrirInfo(){
        const buttonLista       =   document.querySelector(".funcionario_info")
        const formInfo          =   document.querySelector(".alterar_info")
        buttonLista.addEventListener("click",(event)=>{
            event.preventDefault()
            formInfo.classList.toggle("alterar_info_close")

        })
    }

    static  async mostrarInfo(){
        const apiInfo           =   await Api.listarMinhasInfo()
        const divInfo           =   document.querySelector(".mostrar_minha_info")
        const buttonInfo        =   document.querySelector("#minha_info")
        
        buttonInfo.addEventListener("click", (event)=>{
            event.preventDefault()
            divInfo.innerHTML = ""

                const h3Nome            = document.createElement("h3")
                const pLevel            = document.createElement("p")
                const pEmail            = document.createElement("p")
                const spanModalidade    = document.createElement("span")
                
                h3Nome.innerText                = `Nome:${apiInfo.data.username}`
                pEmail.innerText                = `Email: ${apiInfo.data.email}`
                pLevel.innerText                = `Nível profissional: ${apiInfo.data.professional_level}`
                spanModalidade.innerText        = `Modalidade: ${apiInfo.data.kind_of_work}`

                divInfo.append(h3Nome,pLevel,pEmail,spanModalidade)
        })
    
    }

    static async  fecharInfo(){
        const divInfo           =   document.querySelector(".mostrar_minha_info")
        const buttonInfo        =   document.querySelector("#minha_info")

        buttonInfo.addEventListener("click",(event)=>{
            event.preventDefault()
            divInfo.classList.toggle("mostrar_minha_info_close")
        })
    }
    /* static async minhaEmpresa(){
        const apiEmpresas   =   await Api.listarDepartamentos()
        
        const divEmpresa    =   document.querySelector(".separar_empresas")
        const buttonEmpresa =   document.querySelector("#empresa")
        const [{
            company_uuid
        }] = apiEmpresas

        const apiLista      =   await Api.listarEmpresas()
        console.log(apiLista)
        buttonEmpresa.addEventListener("click",(event)=>{
            event.preventDefault()

            apiLista.data.forEach(async element=>{
                console.log(element)
                if(element.uuid == company_uuid){
                    const h2Empresa =   document.createElement("h2")
                    h2Empresa.innerText = element.name
                    divEmpresa.append(h2Empresa)
                }
            }) 
        })
    } */
}

DashboardNormal.mostrarFuncionarios()
DashboardNormal.logout()
DashboardNormal.abrirDepartamentos()
DashboardNormal.alterarInformacoes()
DashboardNormal.abrirInfo()
DashboardNormal.mostrarInfo()
DashboardNormal.fecharInfo()
/* DashboardNormal.minhaEmpresa() */
