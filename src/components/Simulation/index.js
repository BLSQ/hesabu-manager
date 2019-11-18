import React from "react";
import Table from "../Table/table";
import InvoiceHeader from "./SimulationHeader";
import TotalItems from "./TotalItems";

export const Simulation = function(props) {
  return [
    <InvoiceHeader key="header" invoice={props.invoice} />,
    <Table key="invoice" invoice={props.invoice} />,
    <TotalItems key="total-items" items={props.invoice.total_items} />,
  ];
};
