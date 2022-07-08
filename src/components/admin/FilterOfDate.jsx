import { useState, useEffect } from "react";
import { helpHttp } from "../../helpers/helpHttp";

export const FilterOfDate = () => {
  const [option, setOption] = useState(null);

  let url = `http://localhost:5000/employee/?vaccinationdate=${option}`;
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
            <h3>Date Vacunación </h3>
            <input type="date" onChange={(e) => setOption(e.target.value)} />
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
                  <th>Fecha de vacuna</th>
                </tr>
              </thead>
              <tbody>
                {db &&
                  db.map((item) => (
                    <tr key={item.id}>
                      <td>{item.ci}</td>
                      <td>{item.name}</td>
                      <td>{item.lastname}</td>

                      <td>{item.vaccinationdate}</td>
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
