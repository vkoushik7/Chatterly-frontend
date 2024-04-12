import React from "react";

const checkAuth = (WrappedComponent: React.FC) => {
    return (props: any) => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            window.location.href = "/dashboard";
            return null;
        }
        return <WrappedComponent {...props} />;
    };
};

export default checkAuth;