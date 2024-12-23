import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../layouts/Loading/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading></Loading>;
    }
    if (user && user?.email) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;