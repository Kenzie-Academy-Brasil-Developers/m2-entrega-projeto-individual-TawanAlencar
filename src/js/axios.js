const token = localStorage.getItem("@kenzieEmpresa:token") || ""
export const instance = axios.create({
    baseURL: 'http://localhost:6278/',
    timeout: 1000,
    headers:
    { 
        'Content-Type': 'Application/json',
        Authorization:`Bearer ${token}` }
});