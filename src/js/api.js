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
    
    })
    .catch(err => {
        Create.toastErro("Email ou senha inválidos")
    })
    return login
    }
    
    static async fazerCadastro(body){
        const cadastro = await instance.post("auth/register/user",body)
        return cadastro
    }
}

export{Api}