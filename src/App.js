
import React,{useState,useEffect} from "react";
import Order from "./Orders"
import Product from "./Product";
import Users from "./Users";
import Login from "./Login";

import { Routes,Route,Navigate } from "react-router-dom";
import NavBar from "./NavBar";

import { AuthProvider } from "./Authe";
import PrivateRoute from "./PrivateRoute";
function App() {


 const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    const status = window.localStorage.getItem("loginStatus");
    setLoginStatus(status); // Convert string to boolean
  }, []);

  return (
    <AuthProvider className="App">
  
  <NavBar />
        <Routes>
        <Route
          path="/"
          element={loginStatus==="true" ? <Navigate to="/orders" /> : <Navigate to="/login" />}
        />
        
        <Route path="/login"   element={<Login />}/>
        <Route path="/orders"  element={<PrivateRoute><Order/></PrivateRoute>}/>
        <Route path="/product" element={<PrivateRoute><Product/></PrivateRoute>}/>
        <Route path="/users" element={<PrivateRoute><Users/></PrivateRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PrivateRoute><Order/></PrivateRoute>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
