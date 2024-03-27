import{Navigate, Route, Routes} from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage"
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageGroceryStorePage from "./pages/ManageGroceryStorePage";
const AppRoutes= ()=>{
    return(
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage/></Layout>}/>
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>} />
                <Route path="/manage-groceryStore" element={<Layout><ManageGroceryStorePage/></Layout>} />
            </Route>        
            <Route path="/about" element={<span>About</span>}/>
            <Route path="/register" element={<span>Register</span>}/>
            <Route path="/shop" element={<span>Shop</span>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};

export default AppRoutes;