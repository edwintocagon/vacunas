import React from "react";
import { CrudTableRow } from "./CrudTableRow";

export const CrudTable = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div>
      <h3>Tabla de Datos</h3>
      <table className="table-responsive ">
        <thead className="head-table ">
          <tr>
            <th>Cedula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo electronico/Usuario</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* el > y acndicion valida al inicio soluciona al error 
          de datos null en  la consola*/}
          {/* si la consicion falsa va primero funciona, por eso lo true debe ir primero */}
          {data.length > 0 ? (
            data.map((el) => (
              <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
