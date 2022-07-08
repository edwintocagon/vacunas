import React, { useState, useEffect } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { helpHttp } from "../../helpers/helpHttp";
import { Loader } from "./Loader";
import Message from "./Message";

export const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "http://localhost:5000/employee";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
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

  const createData = (data) => {
    /* cojer segundo actual como id ya que es como aleatorio */
    data.id = Date.now();
    //console.log(data);
    let options = {
      body: data,
      /* esto algunas apis cambiam de headers */
      headers: { "content-type": "application/json" },
    };
    /* console.log("opciones:", options); */
    api.post(url, options).then((res) => {
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    /* console.log(endpoint); */
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.put(endpoint, options).then((res) => {
      /* console.log(res); */
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );
    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
      api.del(endpoint, options).then((res) => {
        //console.log(res);
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <br />
        {/* si loading tiene cargamos su componente, caso sontrario se mantiene en null*/}
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            m_s1={"m_s1"}
          />
        )}
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </div>
  );
};
