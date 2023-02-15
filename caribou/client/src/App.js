import {BrowserRouter,Routes,Route} from "react-router-dom";
import Map from "./components/Map";
import SignUp from './components/Signup'
import { useState } from "react";
import ProtectedRoutes from "./ProtectedRoutes";

const App=()=> {
  const [error,setError]=useState("");
  const [user,setUser]=useState({email:'as'});
  const [isAuthenticated,setIsAuthenticated]=useState(false);

//authenticate log in 
  const Login =(details)=>{
    setUser({email:details.email});
    setIsAuthenticated(true);
  }

  //logout user
  const Logout =()=>{
    setUser({email:''});
    setIsAuthenticated(false);
    
}
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignUp error={error} Login={Login} isAuthenticated={isAuthenticated}/> }/>
          <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}/>}>
          <Route path="/home" element={<Map Logout={Logout}/>}/>
          </Route>
          </Routes>
    </BrowserRouter>
  )
}

export default App;
