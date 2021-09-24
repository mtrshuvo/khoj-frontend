import axios from "axios";
import {API} from "../utils/config";

export const dataCreate = (data,token)=>{

    return axios.post(`${API}/data/`, data, {
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        }
    })
}