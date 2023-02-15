import { Navigate, Outlet, } from "react-router-dom";
import Signup from "./components/Signup";

const ProtectedRoutes=({isAuthenticated})=>{

    return isAuthenticated ? <Outlet/> :<Navigate to={'/'}/>
}
export default ProtectedRoutes;