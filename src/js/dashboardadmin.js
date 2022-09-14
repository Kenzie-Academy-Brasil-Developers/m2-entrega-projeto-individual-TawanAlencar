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

    static async renderLista(request){
        const data          = request
        const divLista      = document.querySelector(".separar_empresas")
        const ulLista       = document.querySelector(".ul_lista")

        data.forEach((element)=>{
    
            const liEmpresa         =   document.createElement("li")
            const buttonEmpresaNome =   document.createElement("button")
            const pEmpresaDescricao =   document.createElement("p")
            const pSetor            =   document.createElement("p")
            const spanHorario       =   document.createElement("span")
            const divEmpresa        =   document.createElement("div")
            const divInfoEmpresa    =   document.createElement("div")

            divEmpresa.className            =   "lista_empresa_texto"
            divInfoEmpresa.className        =   "informacoes_da_empresa"
            buttonEmpresaNome.className     =   "button_nome"

            buttonEmpresaNome.setAttribute("id",element.uuid)
            
            pSetor.innerText                =   `Setor: ${element.sectors.description}`
            pEmpresaDescricao.innerText     =   element.description
            buttonEmpresaNome.innerText     =   element.name
            spanHorario.innerText           =   `Abre as: ${element.opening_hours} horas`

            divInfoEmpresa.append(pEmpresaDescricao,pSetor,spanHorario)
            divEmpresa.append(buttonEmpresaNome,divInfoEmpresa)
            liEmpresa.append(divEmpresa)
            ulLista.append(liEmpresa)
            divLista.append(ulLista)
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
        
            optionName.innerText       = element.name
            optionName.value           = element.uuid

            select.append(optionName)
        })
        buttonDepartamento.addEventListener("click", async (event)=>{
            event.preventDefault()
            const dados = {
                name            : inputNomeDepartamento.value,
                description     : inputDescricao.value,
                company_uuid    : select.value
            }
            await Api.criarDepartamento(dados)
        })
    } 

    static async fecharDepartamentos(){
        const buttonDepartamento        =   document.querySelector("#criar_departamento")
        const formDepartamentos         =   document.querySelector(".gerar_departamento")
        
        buttonDepartamento.addEventListener("click", (event)=>{
            event.preventDefault()
            formDepartamentos.classList.toggle("gerar_departamentos_close")
        })
    }
    
    static selecionarEmpresaSetor(){
        const select    = document.querySelector(".valor_empresa")
        const ulLista   = document.querySelector(".ul_lista")

        select.onchange = async ()=>{
            ulLista.innerHTML = ""
            
            const renderFiltro  =   await Api.listarEmpresasSetor(select.value)
            Dashboard.renderLista(renderFiltro.data)

        }
    }

    static async listarDepartamentosEmpresa(){
        const buttonEmpresas        =   document.querySelectorAll(".button_nome")
        const divDepartamentos      =   document.querySelector(".mostrar_departamentos") 
        const buttonFechar          =   document.createElement("button")

        buttonFechar.setAttribute("id","fechar")
        buttonFechar.innerText      =   "Fechar"
        
        buttonEmpresas.forEach((element)=>{
            element.addEventListener("click",async (event)=>{
                event.preventDefault()
            
                divDepartamentos.innerHTML = ""
                const apiDepartamentos          =   await Api.listarDepartamentosDeUmaEmpresa(element.id)
                
                if(apiDepartamentos.data.length > 0){
                    apiDepartamentos.data.forEach(element=>{
                        const pNome                    =   document.createElement("p")
                        const pEmpresaDescricao        =   document.createElement("p")
                        
                        pNome.innerText                =   `Departamento:${element.name}`
                        pEmpresaDescricao.innerText    =   `Descrição:${element.description}`
                        divDepartamentos.append(pNome,pEmpresaDescricao,buttonFechar)
                        
                    })
                }else{
                    divDepartamentos.append(buttonFechar)
                }
                setTimeout(()=>{
                    Dashboard.fecharDepartamentosSelecionado()
                },1000)
            })
        })
    }

    static abrirDepartamentos(){
        const buttonDivEmpresas     =  document.querySelector(".separar_empresas")
        const divDepartamentos      =  document.querySelector(".mostrar_departamentos")

        buttonDivEmpresas.addEventListener("click",(event)=>{
            if(event.target.tagName == "BUTTON"){
                divDepartamentos.style.display = "flex"
            }
            
    
        })
    }
    
    static fecharDepartamentosSelecionado(){
        const divDepartamentos      =  document.querySelector(".mostrar_departamentos")
        const buttonFechar          =  document.querySelector("#fechar")

        if(buttonFechar){
            buttonFechar.addEventListener("click",(event)=>{   
                event.preventDefault()
                divDepartamentos.style.display = "none"
            })

        }
        
    }

    
}

const apiLista  = await Api.listarEmpresas()
Dashboard.renderLista(apiLista.data)
Dashboard.cadastarEmpresa()
Dashboard.modalCriarEmpresas()
Dashboard.criarDepartamento()
Dashboard.fecharDepartamentos()
Dashboard.fecharSetores()
Dashboard.setores()
Dashboard.fecharEmpresas()
Dashboard.todosUsuarios()
Dashboard.fecharUsuarios()
Dashboard.logout()
Dashboard.selecionarEmpresaSetor()
Dashboard.listarDepartamentosEmpresa()
Dashboard.abrirDepartamentos()



