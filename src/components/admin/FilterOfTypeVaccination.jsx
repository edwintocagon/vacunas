import { useState, useEffect } from "react";
import { helpHttp } from "../../helpers/helpHttp";

export const FilterOfTypeVaccination = () => {
  const [option, setOption] = useState(null);

  let url = `http://localhost:5000/employee/?typeofvaccine=${option}`;
  let api = helpHttp();
  let [db, setDb] = useState(null);

  useEffect(() => {
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res);
      } else {
        setDb(null);
      }
    });
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Tio de Vacuna </h3>
            <select onChange={(e) => setOption(e.target.value)}>
              <option value="Sputnik">Sputnik</option>
              <option value="AstraZeneca">AstraZeneca</option>
              <option value="Pfizer">Pfizer</option>
              <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="table-responsive ">
              <thead className="head-table ">
                <tr>
                  <th>CI</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Fecha de nacimiento</th>
                  <th>Tipo Vacuna</th>
                </tr>
              </thead>
              <tbody>
                {db &&
                  db.map((item) => (
                    <tr key={item.id}>
                      <td>{item.ci}</td>
                      <td>{item.name}</td>
                      <td>{item.lastname}</td>
                      <td>{item.birthdate}</td>
                      <td>{item.typeofvaccine}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
