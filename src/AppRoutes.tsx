import{Navigate, Route, Routes} from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage"
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import ManageGroceryStorePage from "./pages/ManageGroceryStorePage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import { UserProvider } from "./contexts/UserContext";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";


const AppRoutes= ()=>{
    return(

        <UserProvider>
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage/></Layout>}/>
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route path="/search/:city" element={<Layout showHero={false}><SearchPage/></Layout>} />
            <Route path="/detail/:groceryStoreId"element={ <Layout showHero={false}><DetailPage /></Layout>}/>
            
            {/* protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/order-status" element={<Layout><OrderStatusPage/></Layout>} />
                <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>} />
            </Route>        

            {/* admin protected routes */}
            <Route element={<AdminProtectedRoute />}>
                <Route path="/manage-groceryStore" element={<Layout><ManageGroceryStorePage/></Layout>} />
            </Route>        
            <Route path="/about" element={<Layout><AboutPage/></Layout>} />
            <Route path="/contact-us" element={<Layout><ContactUsPage/></Layout>} />
            <Route path="/shop" element={<span>Shop</span>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
        </UserProvider>
    );
};

export default AppRoutes;   