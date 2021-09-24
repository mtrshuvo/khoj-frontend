import axios from "axios";
import {API} from "../utils/config";

export const signup = (user)=>{

    return axios.post(`${API}/user/signup`, user, {
        headers: {
           'Content-Type': 'application/json' 
        }
    })
}
export const signin = (user)=>{

    return axios.post(`${API}/user/signin`, user, {
        headers: {
           'Content-Type': 'application/json' 
        }
    })
}

