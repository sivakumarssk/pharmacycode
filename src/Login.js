import  "./App.css";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authe";
function Login(){
    const[userName,setUsername]=useState("");
    const[loginPassword,setLoginPassword]=useState("")
    const loginStatus = window.localStorage.getItem("loginStatus");
    const navigate =useNavigate();

    

    const {login}=useAuth(); 

    useEffect(() => {
        if (loginStatus === "true") {
          navigate("/orders",{replace:true});
        }
      }, [loginStatus, navigate]);


    function handleLogin(event){
        event.preventDefault();
        if(userName === "" || loginPassword === ""){
            alert("Please Enter Valid Credentials ")
        }else
         if(userName===loginPassword){
            alert("Login Successful!")
            login(userName)
            navigate('/orders',{replace:true})
        }else if(userName === "" || loginPassword === ""|| userName!==loginPassword){
            alert("Please Enter Valid Credentials ")
        }
    }
    return(
        <>
        <form className="lodinForm">
            <h1>Sign In</h1>
            <div>
            <input type="text" name="userName" placeholder="Enter Username"
            value={userName} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div>
            <input type="password" name="userName" placeholder="Enter Password"
            value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
            </div> 

            <button onClick={handleLogin}>Login</button>           
        </form>
        </>
    )
}

export default Login