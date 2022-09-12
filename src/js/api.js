import { instance } from "./axios.js"
import { Create } from "./toastify.js"

class Api{
    static token = localStorage.getItem("@kenzieEmpresa:token") || ""
    static uuid = localStorage.getItem("@kenzieEmpresa:tokenID") || ""

    static async fazerLogin(body){
        const login =  await instance.post("auth/login",body)
        .then((res) => {
            localStorage.setItem("@kenzieEmpresa:token",res.data.token)
            localStorage.setItem("@kenzieEmpresa:tokenID",res.data.uuid) 
            Create.toastSucesso("Login realizado com sucesso")
            
            setTimeout(()=>{
                if(res.data.is_admin == true){
                    window.location.assign("./src/pages/dashboardadmin.html")
                }else{
                    window.location.reload()
                }

            },3000)
            
    })
    .catch(err => {
        Create.toastErro("Email ou senha inválidos")
    })
    return login
    }

    static async fazerCadastro(body){
        const cadastro = await instance.post("auth/register/user",body)
        .then((res)=> {
            Create.toastSucesso("Cadastro realizado com sucesso")
        })
        .catch(err =>{
            Create.toastErro("Dados Inválidos")
        })
        return cadastro
    }

    static async listarEmpresas(){
        const empresas = await instance.get("companies")
        .then((res)=>res)
        return empresas
    }

    static async listarEmpresasSetor(valor){
        const setor = await instance.get(`companies/${valor}`)
        .then((res)=>res)
        return setor
    }

    static async listarTodosSetores(){
        const listSetores  = await instance.get("sectors")
        .then((res)=>res)
        return listSetores
    }

    static async listaUsuarios(){
        const listUsuarios = await instance.get("users")
        .then((res)=>res)
        return listUsuarios
    }

    static async criarEmpresa(body){
        const criar        = await instance.post("companies",body)
        .then((res)=> {
            Create.toastSucesso("Empresa Cadastrada com sucesso")
        })
        .catch(err =>{
            Create.toastErro("Erro no cadastro")
        })
        return criar
    }

    static async criarDepartamento(body){
        const departamento  = await instance.post("departaments",body)
        .then((res)=> {
            Create.toastSucesso("Departamento criado com sucesso")
        })
        .catch(err =>{
            Create.toastErro("Erro no cadastro")
        })
        return departamento
    } 
}

export{Api}