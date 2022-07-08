import { useState, useContext, useEffect } from "react";
import { Navbar } from "../../components/ui/Navbar";
import { AuthContext } from "../../auth/authContext";
import { helpHttp } from "../../helpers/helpHttp";
import { useNavigate } from "react-router-dom";

export const EmployeeScreen = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  if (user.user === "admin") {
    navigate("/admin");
  }

  useEffect(() => {
    let url = `http://localhost:5000/employee/?user_like=${user.user}`;
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setForm(res[0]);
        } else {
          setForm(null);
        }
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let api = helpHttp();
    let url = "http://localhost:5000/employee";
    const updateData = (data) => {
      if (data.vaccinationstatus === "no vacunado") {
        data.typeofvaccine = "";
        data.vaccinationdate = "";
        data.numberofdoses = "";
      }
      let endpoint = `${url}/${data.id}`;
      let options = {
        body: data,
        headers: { "content-type": "application/json" },
      };
      api.put(endpoint, options).then((res) => {
        if (!res.err) {
          alert("Datos actualizados");
        } else {
          alert("Error al actualizar");
        }
      });
    };
    updateData(form);
  };

  return (
    <>
      <h1>Employee Screen</h1>
      <Navbar />
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ci">CI: {form ? form.ci : ""}</label>
        </div>
        <div>
          <label htmlFor="name">
            Name: {form ? form.name : ""} {form ? form.lastname : ""}
          </label>
        </div>
        <div>
          <label htmlFor="email">Email:{form ? form.email : ""} </label>
        </div>
        <div>
          <label htmlFor="birthdate">
            Birthdate: {form ? form.birthdate : ""}
          </label>
        </div>
        <div>
          <label htmlFor="address">Address: {form ? form.address : ""}</label>
        </div>
        <div>
          <label htmlFor="phone">Phone: {form ? form.phone : ""}</label>
        </div>
        <div>
          <label htmlFor="vaccinationstatus">
            Vaccination Status: {form ? form.vaccinationstatus : ""}
          </label>
        </div>
        <div>
          <label htmlFor="typeofvaccine">
            Type of Vaccine: {form ? form.typeofvaccine : ""}
          </label>
        </div>
        <div>
          <label htmlFor="vaccinationdate">
            Vaccination Date: {form ? form.vaccinationdate : ""}
          </label>
        </div>

        <div>
          <label htmlFor="numberofdoses">
            Number of Doses: {form ? form.numberofdoses : ""}
          </label>
        </div>

        <hr />
        {/* birth date*/}
        <div className="form-group">
          <label htmlFor="birthdate">Birthdate: </label>
          <input
            type="date"
            className="form-control"
            name="birthdate"
            onChange={handleChange}
          />
        </div>
        {/* address */}

        <div className="form-group">
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            className="form-control"
            name="address"
            onChange={handleChange}
          />
        </div>
        {/* phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            onChange={handleChange}
          />
        </div>
        {/* Vaccination status */}
        <div className="form-group">
          <label htmlFor="vaccinationstatus">Vaccination Status: </label>
          {/* option vacunado - no vacunado */}
          <select
            className="form-control"
            name="vaccinationstatus"
            onChange={handleChange}
          >
            <option value="no vacunado">No vacunado</option>
            <option value="vacunado">Vacunado</option>
          </select>
        </div>

        {/* if vaccinationstatus.value= vacunado */}
        {form && form.vaccinationstatus === "vacunado" && (
          <>
            <div className="form-group">
              <label htmlFor="typeofvaccine">Type of Vaccine: </label>
              <select
                className="form-control"
                name="typeofvaccine"
                onChange={handleChange}
              >
                <option value="Sputnik">Sputnik</option>
                <option value="AstraZeneca">AstraZeneca</option>
                <option value="Pfizer">Pfizer</option>
                <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="vaccinationdate">Vaccine Date: </label>
              <input
                type="date"
                className="form-control"
                name="vaccinationdate"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberofdoses">Number of Doses: </label>
              <input
                type="number"
                className="form-control"
                name="numberofdoses"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button type="submit" className="btn-save">
          Guardar Cambios
        </button>
      </form>
    </>
  );
};
