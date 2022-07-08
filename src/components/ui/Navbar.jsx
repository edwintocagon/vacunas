import { useContext } from "react";
import { types } from "../../types/types";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    /* const action = {
      type: types.logout,
    }; */
    /*   dispatch(action); */
    dispatch({ type: types.logout });
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="navbar">
        <span> {user.user}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};
