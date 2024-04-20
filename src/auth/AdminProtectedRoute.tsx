import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const AdminProtectedRoute = () => {

    const { isAuthenticated, isLoading } = useAuth0();

    const { currentUser } = useUser();

    if (isLoading) {
        return null;
    }

    // check user is logged in and of type admin

    if (isAuthenticated && currentUser?.userType == 'admin') {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;

};

export default AdminProtectedRoute;