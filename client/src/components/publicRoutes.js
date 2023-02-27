import React, { Children } from "react";
import { Navigate } from "react-router-dom";

function publicRoutes({children}) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default publicRoutes;
