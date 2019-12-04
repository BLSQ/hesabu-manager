import humanize from "string-humanize";
import React from "react";
import {
  Table as MaterialTable,
  TableRow as MaterialRow,
  TableHead,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Solution from "./Solution";
import { sortCollator } from "../../../../lib/formatters";

const useStyles = makeStyles(theme => ({}));

const Table = function(props) {
  const { invoice } = props;
  const headers = [];
  const classes = useStyles();

  invoice.activity_items.forEach(activity_item => {
    Object.keys(activity_item.cells).forEach(state_or_formula => {
      if (!headers.includes(state_or_formula)) {
        headers.push(state_or_formula);
      }
    });
  });

  let rows = invoice.activity_items;
  rows = rows.sort((a, b) =>
    sortCollator.compare(a.activity.code, b.activity.code),
  );

  return (
    <div className={classes.root}>
      <MaterialTable className={classes.table} aria-label="simple table">
        <TableHead>
          <MaterialRow>
            <TableCell>Activity</TableCell>
            {headers.map(key => (
              <TableCell key={key}>{humanize(key)}</TableCell>
            ))}
          </MaterialRow>
        </TableHead>
        <TableBody>
          {rows.map(function(row, i) {
            return (
              <MaterialRow key={[row.activity.code, i].join("-")}>
                <TableCell>{row.activity.name}</TableCell>
                {headers.map((key, index) => {
                  return (
                    <TableCell key={key}>
                      <Solution rowData={row.cells[key]} />
                    </TableCell>
                  );
                })}
              </MaterialRow>
            );
          })}
        </TableBody>
      </MaterialTable>
    </div>
  );
};

export default Table;
