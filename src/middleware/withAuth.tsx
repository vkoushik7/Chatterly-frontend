import React from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      window.location.href = "/login";
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
