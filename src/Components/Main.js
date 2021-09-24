import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Home from './Home';
import Login from "./Login";
import Signup from "./Signup";
import PrivateRoute from './PrivateRoute';
import { isAuthenticated } from '../utils/auth';


export default function Main() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/signup" exact render={()=>
                    isAuthenticated()? <Redirect to="/khoj" /> : <Signup />
                } />
                <PrivateRoute path="/khoj">
                    <Home/>
                </PrivateRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}
