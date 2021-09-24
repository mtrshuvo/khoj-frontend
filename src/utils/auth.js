import jwt_decode from "jwt-decode";

//set token in localstorage
export const authenticate = (token, cb)=>{
    if(typeof window !== 'undefined'){
        localStorage.setItem(`${process.env.REACT_APP_TOKEN_NAME}`, JSON.stringify(token));
        cb();
    }
}

//getting user info by decode token value
export const userInfo = ()=>{
    const jwt = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_NAME}`));
    const decode = jwt_decode(jwt);
    return {
        ...decode, token: jwt
    }

}
export const isAuthenticated = ()=>{
    if(typeof window === 'undefined') return false;
    if (localStorage.getItem(`${process.env.REACT_APP_TOKEN_NAME}`)){
        const {exp} =  jwt_decode(localStorage.getItem(`${process.env.REACT_APP_TOKEN_NAME}`));
        if( (new Date().getTime()) <= exp * 1000 ){
            return true;
        } 
        else {
            localStorage.removeItem(`${process.env.REACT_APP_TOKEN_NAME}`);
            return false;
            }
    }
}

export const signOut = cb =>{
    if (typeof window !== 'undefined'){
        localStorage.removeItem(`${process.env.REACT_APP_TOKEN_NAME}`);
        cb();
    }
}