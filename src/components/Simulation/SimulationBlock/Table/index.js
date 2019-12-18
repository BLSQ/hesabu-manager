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
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Solution from "./Solution";
import { sortCollator } from "../../../../lib/formatters";
import useStyles from "./styles";

const prepareHeaders = (collection, t) => {
  return collection
    .reduce((array, item) => {
      Object.keys(item).forEach(headerName => {
        if (!array.includes(headerName)) {
          array.push(headerName);
        }
      });
      return array;
    }, [])
    .map(item => ({
      Header: humanize(item),
      accessor: item,
      width: 50,
      // eslint-disable-next-line
      Cell: ({ cell: { value } }) => {
        return <Solution cell={value} />;
      },
    }));
};

const prepareData = items => {
  return items.sort((a, b) => sortCollator.compare(a.key, b.key));
};

const cellBg = (cell, classes) => {
  if (!cell.value) {
    return undefined;
  }
  if (cell.value.is_input) {
    return classes.is_input;
  }
  if (cell.value.is_output) {
    return classes.is_output;
  }
  return {};
};

const Table = props => {
  const {
    periodView: { activity_items: activityItems },
    setSelectedCell,
  } = props;
  const classes = useStyles(props);
  const { t } = useTranslation();

  const columns = React.useMemo(() => prepareHeaders(activityItems, t));

  const data = React.useMemo(() => prepareData(activityItems, t));
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

  if (!columns.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      <MaterialTable {...getTableProps()} className={classes.table}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <TableRow
              key={`headerGroup${index}`}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map(column => (
                <TableCell key={column} {...column.getHeaderProps()}>
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
              <TableRow key={i} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell
                      key={cell.value}
                      {...cell.getCellProps()}
                      onClick={() => {
                        setSelectedCell(cell.value);
                      }}
                      classes={{
                        body: cellBg(cell, classes),
                      }}
                    >
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

Table.propTypes = {
  setSelectedCell: PropTypes.func,
  periodView: PropTypes.object,
};

export default Table;
