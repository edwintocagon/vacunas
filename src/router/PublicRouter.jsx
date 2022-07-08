import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

/* (here) controller reques the API */

export const PublicRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user.logged ? <Navigate to="/employee" /> : children;
};
