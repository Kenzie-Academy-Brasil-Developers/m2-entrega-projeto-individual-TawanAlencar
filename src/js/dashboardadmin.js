import { Api } from "./api.js";





class Dashboard{
    static async setores(){
        const apiSetores        =   await Api.listarTodosSetores()
        const buttonSetores     =   document.querySelector("#setores")
        const divSetores        =   document.querySelector(".separar_setores")

        buttonSetores.addEventListener("click", (event)=>{
            event.preventDefault()
            divSetores.innerHTML = ""
            apiSetores.data.forEach(element => {
                const pSetores =  document.createElement("p")
                pSetores.innerText =  element.description
                divSetores.append(pSetores)
                
            });
        })
    }
    static async logout(){
        const buttonLogout      =   document.querySelector("#sair")
        buttonLogout.addEventListener("click", (event)=>{
            event.preventDefault()
            localStorage.removeItem("@kenzieEmpresa:token")
            localStorage.removeItem("@kenzieEmoresa:tokenID")
            window.location.assign("../../index.html")
        })
    }

    static async fecharSetores(){
        const buttonSetores     =   document.querySelector("#setores")
        const divSetores        =   document.querySelector(".separar_setores")
        buttonSetores.addEventListener("click", (event)=>{
            event.preventDefault()
            divSetores.classList.toggle("separar_setores_close")
        })
    }

    static async renderLista(){
        const {data}        = await Api.listarEmpresas()
        const divLista      = document.querySelector(".separar_empresas")

        data.forEach(element=>{
            const liEmpresa         =   document.createElement("li")
            const buttonEmpresaNome =   document.createElement("button")
            const pEmpresaDescricao =   document.createElement("P")
            const pSetor            =   document.createElement("p")
            const spanHorario       =   document.createElement("span")
            const divEmpresa        =   document.createElement("div")
            const divInfoEmpresa    =   document.createElement("div")
            
            divEmpresa.className            =   "lista_empresa_texto"
            divInfoEmpresa.className        =   "informacoes_da_empresa"

            pSetor.innerText                =   `Setor: ${element.sectors.description}`
            pEmpresaDescricao.innerText     =   element.description
            buttonEmpresaNome.innerText     =   element.name
            spanHorario.innerText           =   `Abre as: ${element.opening_hours} horas`

            divInfoEmpresa.append(pEmpresaDescricao,pSetor,spanHorario)
            divEmpresa.append(buttonEmpresaNome,divInfoEmpresa)
            liEmpresa.append(divEmpresa)
            divLista.append(liEmpresa)
        })
        
    }
    
    static async fecharEmpresas(){
        const buttonEmpresas     =   document.querySelector("#empresas")
        const divEmpresas        =   document.querySelector(".separar_empresas")

        buttonEmpresas.addEventListener("click", (event)=>{
            event.preventDefault()
            divEmpresas.classList.toggle("separar_empresas_close")
        })
    }

    static async todosUsuarios(){
        const apiUsuarios       =   await Api.listaUsuarios()
        const buttonUsuarios    =   document.querySelector("#usuarios")
        const divUsuarios       =   document.querySelector(".separar_usuarios")

        buttonUsuarios.addEventListener("click", (event)=>{
            event.preventDefault()
            divUsuarios.innerHTML = ""
            apiUsuarios.data.forEach(element=>{
                const h3Nome            = document.createElement("h3")
                const pLevel            = document.createElement("p")
                const spanModalidade    = document.createElement("span")

                h3Nome.innerText                =  element.username
                pLevel.innerText                = `Nível profissional: ${element.professional_level}`
                spanModalidade.innerText        = `Modalidade: ${element.kind_of_work}`

                divUsuarios.append(h3Nome,pLevel,spanModalidade)
            })
        })
    }

    static async fecharUsuarios(){
        const buttonUsuarios     =   document.querySelector("#usuarios")
        const divUsuarios        =   document.querySelector(".separar_usuarios")

        buttonUsuarios.addEventListener("click", (event)=>{
            event.preventDefault()
            divUsuarios.classList.toggle("separar_usuarios_close")
        })
    }

    static async modalCriarEmpresas(){
        const formCadastro  = document.querySelector(".gerar_empresa")
        const buttonCriar   = document.querySelector("#criar_empresa")

        buttonCriar.addEventListener("click",(event)=>{
            event.preventDefault()
            formCadastro.classList.toggle("gerar_empresa_close")
        })
    }

    static cadastarEmpresa(){
        const formCriar             = document.querySelector(".gerar_empresa")
        const inputNome             = document.querySelector(".nome_empresa")
        const inputEmpresa          = document.querySelector(".descricao_empresa")
        const inputHorario          = document.querySelector(".horario_empresa")
        const buttonCadastrar       = document.querySelector("#cadastrar_empresa")
        const select                = document.querySelector(".gerar_empresa select")
        buttonCadastrar.addEventListener("click",async (event)=>{
            event.preventDefault()
            const dados = {
                name            : inputNome.value,
                opening_hours   : inputHorario.value,
                description     : inputEmpresa.value,
                sector_uuid     : select.value
            }
            await Api.criarEmpresa(dados)
        })
    }

    static async criarDepartamento(){
        const apiEmpresas           = await Api.listarEmpresas()
        const inputNomeDepartamento = document.querySelector(".nome_departamento")
        const inputDescricao        = document.querySelector(".descricao_departamento")
        const buttonDepartamento    = document.querySelector("#cadastrar_departamento")
        const select                = document.querySelector(".gerar_departamento select")

        apiEmpresas.data.forEach(element=>{
            const optionName        = document.createElement("option")
        
            optionName.innerText    = element.name
            optionName.id           = element.uuid

            select.append(optionName)
        })
        buttonDepartamento.addEventListener("click", async (event)=>{
            event.preventDefault()
            const dados = {
                name            : inputNomeDepartamento.value,
                description     : inputDescricao.value,
                company_uuid    : select.options[select.selectIndex].id
            }
            await Api.criarDepartamento(dados)
        })
    } 
}


Dashboard.criarDepartamento()
Dashboard.cadastarEmpresa()
Dashboard.modalCriarEmpresas()
Dashboard.fecharSetores()
Dashboard.setores()
Dashboard.renderLista()
Dashboard.fecharEmpresas()
Dashboard.todosUsuarios()
Dashboard.fecharUsuarios()
Dashboard.logout()