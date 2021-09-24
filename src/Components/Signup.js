import React, { useState } from "react";
import Layout from "./Layout";
import { showError, showSuccess, showLoading } from "../utils/alertMessage";
import { signup } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    loading: false,
    disabled: false,
    redirect: false,
    success:false
  });

  const { name, email, password, loading, error, redirect, disabled, success } = values;

  const handleChange = (event) => {
    setValues({
      ...values,
      error: false,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false,
      disabled: true,
    });
    signup({ name, email, password })
    .then((response) => {
      setValues({
        ...values,
        name: "",
        email: "",
        password: "",
        error: false,
        loading:false,
        success: true,
      });
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
            success: false,
        })
    })
  };

  const signInForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input
          name="name"
          type="text"
          className="form-control"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          name="password"
          type="password"
          className="form-control"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <hr />
      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={disabled}
      >
        Login
      </button>
    </form>
  );
  const showSuccess = ()=>{
      if (success){
        return <div className="alert alert-primary">
            Account Successfully Created. <Link to="/login">Login Here</Link>
        </div>  
      }
  }
  // const redirectUser = ()=> {
  //     if(redirect) return <Redirect to="/" />
  // }
  return (
    <Layout title="Sign Up" className="container">
        {showLoading(loading)}
        {showSuccess()}
        {showError(error, error)}
      <h3>Register Here</h3>
      <hr />
      {signInForm()}
      <hr />
    </Layout>
  );
}
