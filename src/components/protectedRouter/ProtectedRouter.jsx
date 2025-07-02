import { Navigate } from "react-router";

function ProtectedRouter({ children }) {
    const token = localStorage.getItem("userToken");

    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRouter;
