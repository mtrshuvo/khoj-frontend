import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {isAuthenticated, signOut} from "../utils/auth";

const isActive = (history, path)=>{
     if (history.location.pathname === path){
         return {color: "red"}
     }else{
         return {color: "gray"}
     }
}

function Menu({history}) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <ul className="nav nav-items">
            { isAuthenticated() && <>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/khoj")} to="/khoj">Khoj</Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link" style={{cursor:"pointer"}} onClick={()=>{
                        signOut(()=>{
                            history.push("/")
                        })
                    }}>Sign Out</span>
                </li>
            </> }
            
               {!isAuthenticated() && <>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/")} to="/">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>
                </li>
                </>}
            
                
                
            </ul>
        </nav>
    );
}

export default withRouter(Menu);
