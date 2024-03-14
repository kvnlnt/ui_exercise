import React from "react";
import ReactDOM from "react-dom/client";
import { OneTimeLoanPayment } from "./pages/OneTimeLoanPayment";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <OneTimeLoanPayment />
  </React.StrictMode>
);
