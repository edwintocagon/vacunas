import React from "react";

export const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { ci, name, lastname, email, user, password, id } = el;
  return (
    <tr>
      <td>{ci}</td>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{email}</td>
      <td> {password} </td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
};
