import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ children, ...props }) {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route {...props}>
      {isLoggedIn ? children : <Redirect to={"/home"} />}
    </Route>
  );
}

export default ProtectedRoute;
