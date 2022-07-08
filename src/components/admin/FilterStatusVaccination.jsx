import { useState, useEffect } from "react";
import { helpHttp } from "../../helpers/helpHttp";

export const FilterStatusVaccination = () => {
  /* option vacunados and no vacunados  */
  const [option, setOption] = useState(null);

  let url = `http://localhost:5000/employee/?vaccinationstatus=${option}`;
  let api = helpHttp();
  let [db, setDb] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(true);
      }
      setLoading(false);
    });
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Estado Vacunación</h3>
            <select onChange={(e) => setOption(e.target.value)}>
              <option value="vacunado">Vacunados</option>
              <option value="no vacunado">No vacunados</option>
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
                  <th>Estado Vacuna</th>
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
                      <td>{item.vaccinationstatus}</td>
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
