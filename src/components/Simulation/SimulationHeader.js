import React from "react";
import humanize from "string-humanize";

const SimulationHeader = function(props) {
  const name = props.invoice.code;
  const formatted_date = props.invoice.period;
  const { code } = props.invoice;
  return (
    <div
      className="invoice-container"
      data-period={props.invoice.period}
      data-orgunit={props.invoice.orgunit_ext_id}
      data-code={props.invoice.code}
    >
      <a name={`${name}-${formatted_date}`} />
      <h2>
        <span>{humanize(code)}</span> -
        <span title={props.invoice.orgunit_ext_id}> {humanize(name)} </span>
        <span className="pull-right">
          <i className="fa fa-calendar" /> {props.invoice.period}
        </span>
      </h2>
    </div>
  );
};

export default SimulationHeader;
