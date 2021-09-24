import React, { Component } from 'react';
import Layout from "./Layout";
import {dataCreate} from "../api/dataCreation";
import { userInfo } from '../utils/auth';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_data: "",
            checkValue: "",
            result: "",
            found:false,
            errors: {},
            disabled:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    //form validation
    chekfromInput = () => {
        let { input_data, checkValue } = this.state;
        
        let errors = {};
        let formIsValid = true;
        const datasre = /^[+-]?\d+(,\s?\d+)*$/;
        if (input_data.length === 0) {
            formIsValid = false;
            errors["datas"] = "Cannot be empty";
        }
        if (typeof input_data !== "undefined") {
            if (!datasre.test(input_data)) {
                formIsValid = false;
                errors["datas"] = "Data list should be 10, 11, 12 "
            }
        }

        if (!checkValue) {
            formIsValid = false;
            errors["checkValue"] = "Cannot be empty";
        }
        if (typeof checkValue !== "undefined") {
            const reg = /^[+-]?\d+$/;
            if (isNaN(checkValue) && !reg.test(checkValue)) {
                formIsValid = false;
                errors["checkValue"] = "Data should be number like 12 or 100 etc. "
            }
        }
        this.setState({ errors: errors });
        return formIsValid;

    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
            errors: {},
            result: "",
            disabled: false,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            disabled: true,
        })
        if (this.chekfromInput()) {
            const { input_data, checkValue } = this.state;
            let dataArray = input_data.split(",").map(data=> data.trim()).sort((a,b)=> b-a );
            let data = {
                user: userInfo()._id,
                input_data: dataArray.toString()
            }
            dataCreate(data, userInfo().token)
                .then(res=>{
                    if (dataArray.includes(checkValue.trim())) {
                        this.setState({
                            found: true,
                            result: "Found",
                            disabled:false,
                        })
                    } else {
                        this.setState({
                            found: false,
                            result: "Not Found",
                            disabled:false,
                        })
                    }
                })
                .catch(err=>{
                    console.log(err);
                    this.setState({
                        errors: "Something Failed",
                        disabled:false,
                    })
                })
            
        }
        else { console.log("Form not valid"); }
    }
    render() {
        let { input_data, checkValue, errors, result, found, disabled } = this.state;
        const { _id } = userInfo();
        return (
        <Layout title="Khoj" className="container">
            
        <div className="row" style={{ display: "flex", justifyContent:"space-between", textAlign:"center"}}>
            <div className="col" >
                <h1>Khoj</h1>
                <form onSubmit={this.handleSubmit} className="form">
                <div className="form-group">
                <input type="text" name="input_data" placeholder="1, 7, 5, ..." className="form-control" value={input_data} onChange={this.handleChange} />
                </div>
                <span style={{ color: "red" }}>{errors["datas"]}</span>
                    <br />
                    <div className="form-group">
                <input type="text" name="checkValue" className="form-control" value={checkValue} onChange={this.handleChange} />
                </div>
                <span style={{ color: "red" }}>{errors["checkValue"]}</span>
                    <br />
                <button type="submit" disabled={disabled} className="btn btn-info" >Submit</button>
                </form>
            </div>
            <div className="col">
                <h1 className="display-4">Result</h1>
                <div className="display-1" style={found ? {color:"Green"}: {color:"Red"}}>{result}</div>
            </div>
            <p className="text-info">id: {_id} (For API checking purpose)</p>

        </div>
            </Layout>
        );
    }
}

