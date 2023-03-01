import axios from "axios";
import { useState, useEffect } from "react";

const api = axios.create({
    baseURL: 'https://api.github.com'
})


export function useFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
      api.get(url)
       .then(response => {
        setData(response.data);
       })
       .catch(err =>{
        setError(err)
       })
       .finally(()=>{
        setIsFetching(false)
       })
    }, [])

    return {data, isFetching} 
}

// novo arquivo de hook como useEffect, importando axios
// como eu quero chamar outros tipos de api sem ser apenas tipo repositorios, eu troco o parametro de tipagem
// para T com o valor unknown (diferente de any) e agora se torna do tipo genérico. 
// ps : como n é só repositorios que eu posso chamar, eu troco para data ou setData