import humanize from "string-humanize";
import React from "react";
import {
  Table as MaterialTable,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { useTable } from "react-table";
import Solution from "./Solution";
import { sortCollator } from "../../../../lib/formatters";

const prepareHeaders = collection => {
  return collection
    .reduce(
      (array, item) => {
        Object.keys(item.cells).forEach(headerName => {
          if (!array.includes(headerName)) {
            array.push(headerName);
          }
        });
        return array;
      },
      ["activity"],
    )
    .map(item => ({
      Header: humanize(item),
      accessor: item,
      width: 50,
      Cell: ({ cell: { value } }) => {
        if (!value) {
          return null;
        }
        return value.solution ? <Solution rowData={value} /> : value.label;
      },
    }));
};

const prepareData = activity_items => {
  return activity_items
    .sort((a, b) => sortCollator.compare(a.activity.code, b.activity.code))
    .map(item => {
      return {
        activity: {
          label: item.activity.name,
        },
        ...item.cells,
      };
    });
};

const Table = function(props) {
  const {
    periodView: { activity_items },
  } = props;
  const columns = React.useMemo(() => prepareHeaders(activity_items));
  const data = React.useMemo(() => prepareData(activity_items));

  const {
    headerGroups,
    getTableProps,
    rows,
    prepareRow,
    getTableBodyProps,
  } = useTable({
    columns,
    data,
  });

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <MaterialTable {...getTableProps()} style={{ width: "90vw" }}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaterialTable>
    </div>
  );
};

export default Table;
