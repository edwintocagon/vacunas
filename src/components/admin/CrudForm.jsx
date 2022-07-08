import React, { useState, useEffect } from "react";
import { helpHttp } from "../../helpers/helpHttp";

const initailForm = {
  ci: "",
  name: "",
  lastname: "",
  email: "",
  id: null,
};

export const CrudForm = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initailForm);
  const [error, setError] = useState(true);
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initailForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setForm({
      ...form,
      user: form.email,
      password: form.ci,
      birthdate: "",
      address: "",
      phone: "",
      vaccinationstatus: "",
      typeofvaccine: "",
      vaccinationdate: "",
      numberofdoses: "",
    });
  }, [form.ci, form.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* validacion simple */
    if (!form.ci || !form.name || !form.lastname || !form.email) {
      alert("Todos los campos son requeridos");
      return;
    }
    if (!form.ci.match(/^[0-9]+$/)) {
      alert("El ci debe ser un numero valido ");
      return;
    }
    if (form.ci.length !== 10) {
      alert("El ci debe tener 10 digitos");
      return;
    }
    if (form.name.match(/[0-9]/) || form.lastname.match(/[0-9]/)) {
      alert("El nombre y apellido no deben contener numeros");
      return;
    }
    if (form.name.match(/[^a-zA-Z\s]/) || form.lastname.match(/[^a-zA-Z\s]/)) {
      alert("El nombre y apellido no deben contener caracteres especiales");
      return;
    }
    if (
      !form.email.match(
        /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
      )
    ) {
      alert("El email no es valido");
      return;
    }

    let url2 = `http://localhost:5000/employee/?email_like=${form.email}`;
    helpHttp()
      .get(url2)
      .then((res) => {
        if (!res.err) {
          if (res.length > 0 && form.id === null) {
            alert("El email ya existe");
            setError(true);
            return;
          } else {
            setError(false);
          }
        }
      });

    let url = `http://localhost:5000/employee/?ci_like=${form.ci}`;
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          if (res.length > 0 && form.id === null) {
            alert("El ci ya existe");
            return;
          } else {
            if (error === false) {
              if (form.id === null) {
                createData(form);
              } else {
                updateData(form);
              }
              handleReset();
            }
          }
        }
      });
  };

  const handleReset = (e) => {
    setForm(initailForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"} </h3>
      <form onSubmit={handleSubmit} className="formadmin">
        <div className="form-group">
          <label htmlFor="ci">CI: </label>
          <input
            type="numeric"
            name="ci"
            placeholder="Cedula"
            onChange={handleChange}
            value={form.ci}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Nombres: </label>
          <input
            type="text"
            name="name"
            placeholder="Nombres"
            onChange={handleChange}
            value={form.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Apellidos: </label>
          <input
            type="text"
            name="lastname"
            placeholder="Apellidos"
            onChange={handleChange}
            value={form.lastname}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            placeholder="correo electronico"
            onChange={handleChange}
            value={form.email}
          />
        </div>

        <input type="submit" value="Enviar" />
        <input
          type="reset"
          value="Limpiar"
          onClick={handleReset}
          className="btnreset"
        />
      </form>
    </div>
  );
};
