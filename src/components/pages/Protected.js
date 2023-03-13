import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        alert("please login");
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default Protected;

