import axios from "axios";

// {variavel}/json/ <-- RESTANTE

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default api;