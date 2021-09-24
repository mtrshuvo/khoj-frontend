import React, {useState} from 'react';
import Layout from './Layout';
import {showError, showLoading} from "../utils/alertMessage";
import { signin } from "../api/authApi";
import { Redirect } from 'react-router-dom';
import {authenticate, isAuthenticated, userInfo} from "../utils/auth"


export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false,
    });

    const { email, password, loading, error, redirect, disabled } = values;

    const handleChange = event => {
        setValues({
            ...values,
            error:false,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = event =>{
        event.preventDefault();
        setValues({
            ...values,
            loading:true,
            error:false,
            disabled:true,
        });
        signin({email, password}).then(res=>{
            authenticate(res.data.token, ()=>{
                setValues({
                    ...values,
                    loading:false,
                    error:false,
                    disabled:false,
                    redirect:true,
                })
            })
            
        })
        .catch(err=>{
            let errMsg = "Something Wrong"
        if (err.response){
            errMsg = err.response.data;
        }else{
            errMsg = "Something Wrong"
        }
        setValues({
            ...values,
            error: errMsg,
            disabled: false,
            loading:false,
        })
            
        }) 
    }

    const redirectUser = ()=>{
        if (redirect){
            return <Redirect to="/khoj" />;
        }
        if(isAuthenticated()) return <Redirect to="/khoj" />
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input name='email' type="email" className="form-control"
                    value={email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input name="password" type="password" className="form-control"
                    value={password} onChange={handleChange} required />
            </div>
            <br/>
            <button type="submit" className="btn btn-outline-primary" disabled={disabled}>Login</button>
        </form>
    );
    // const redirectUser = ()=> {
    //     if(redirect) return <Redirect to="/" />
    // }
    return (
        <Layout title="Login" className="container" >
           {redirectUser()}
           {showError(error, error)}
           {showLoading(loading)}
            <h3>Login Here</h3>
            <hr />
            {loginForm()}
            <hr />
        </Layout>
    );
}
