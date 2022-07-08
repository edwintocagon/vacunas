import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { types } from "../../types/types";
import { useContext } from "react";
import { AuthContext } from "../../auth/authContext";
import { helpHttp } from "../../helpers/helpHttp";

export const LoginScreen = () => {
  const [form, setForm] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    /*     console.log(form); */
  };

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.user || !form.password) {
      alert("Datos incompletos");
      return;
    }
    let url = `http://localhost:5000/employee/?user_like=${form.user}`;

    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setError(null);
          if (form.user === "admin" && form.password === "admin") {
            dispatch({ type: types.login, payload: { user: form.user } });
            navigate("/admin");
          }

          if (res[0].user === form.user && res[0].password === form.password) {
            const action = {
              type: types.login,
              payload: { user: res[0].user },
            };
            dispatch(action);
            /*  const lastPath = localStorage.getItem("lastPath") || "marvel";
            navigate(lastPath, { replace: true }); */
          } else {
            return;
          }
        } else {
          /* setEmployee(null); */
          setError(true);
        }
      });
  };

  return (
    <div className="container-login">
      <h1>Login Screen</h1>
      <hr />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="user"
          placeholder="User"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Login" className="btnlogin" />
      </form>
    </div>
  );
};
