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
                    window.location.assign("./src/pages/dashboardusuario.html")
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
        .then((res)=> {
            setTimeout(()=>{
                window.location.reload()
            },3000)
        })
        .catch(err =>{
            Create.toastErro("Erro no cadastro")
        })
        return criar
    }

    static async criarDepartamento(body){
        const departamento  = await instance.post("departments",body)
        .then((res)=> {
            Create.toastSucesso("Departamento criado com sucesso")
        })
        .then((res)=> {
            setTimeout(()=>{
                window.location.reload()
            },3000)
        })
        .catch(err =>{
            Create.toastErro("Erro no cadastro")
        })
        return departamento
    } 
    
    static async listarDepartamentos(){
        const listDepartaments  = await instance.get("departments")
        .then((res)=>res)
        return listDepartaments
    }

    static async listarDepartamentosDeUmaEmpresa(valor){
        const listDepartamentosEmpresa  = await instance.get(`departments/${valor}`)
        .then((res)=>res)
        return listDepartamentosEmpresa
    }

    static async funcionariosMesmoDepartamento(){
        const funcionarios              = await instance.get(`users/departments/coworkers`)
        .then((res)=>res)
        return funcionarios
    }
    
    static async editarDados(body){
        const infoFuncionario           = await instance.patch("users",body)
        .then((res)=> {
            Create.toastSucesso("Dados alterados com sucesso")
        })
        .then((res)=> {
            setTimeout(()=>{
                window.location.reload()
            },3000)
        })
        .catch(err =>{
            Create.toastErro("Verifique suas informações")
        })
        return infoFuncionario
    }

    static async listarMinhasInfo(){
        const   info       =    await instance.get("users/profile")
        .then((res)=>res)
        return info
    }
}

export{Api}