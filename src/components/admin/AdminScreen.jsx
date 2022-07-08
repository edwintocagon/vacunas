import React from "react";
import { Navbar } from "../ui/Navbar";

import { CrudApi } from "./CrudApi";
import { FilterOfDate } from "./FilterOfDate";
import { FilterOfTypeVaccination } from "./FilterOfTypeVaccination";
import { FilterStatusVaccination } from "./FilterStatusVaccination";

export const AdminScreen = () => {
  return (
    <div>
      <h1>Admin Screen</h1>
      <Navbar />
      <hr />
      <CrudApi />
      <hr />
      <FilterStatusVaccination />
      <br />
      <FilterOfTypeVaccination />
      <br />

      <FilterOfDate />
    </div>
  );
};
