import humanize from "string-humanize";
import React, { useMemo, useState, useEffect } from "react";
import {
  Table as MaterialTable,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { useTable } from "react-table";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Solution from "./Solution";
import { sortCollator } from "../../../../lib/formatters";
import useStyles from "./styles";
import { connect } from "react-redux";
import { setSelectedCell } from "../../../../actions/ui";
import classNames from "classnames";

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
  return items.sort((a, b) => sortCollator.compare(a.meta.key, b.meta.key));
};

function isTopic(cellValue) {
  return cellValue && !cellValue.hasOwnProperty("is_input");
}

const cellBg = (cell, classes, isCurrent = false) => {
  if (cell.value) {
    return classNames(classes.cell, {
      [classes.is_topic]: isTopic(cell.value || {}),
      [classes.interactable]: cell.value.is_input || cell.value.is_output,
      [classes.is_input]: cell.value.is_input,
      [classes.is_output]: cell.value.is_output,
      [classes.is_current]: isCurrent,
    });
  } else {
    return "";
  }
};

const cellTooltip = (cell, t) => {
  if (!cell || !cell.value) {
    return t("tooltips.cell.noData");
  }
  if (cell.value.isInput) {
    return t("tooltips.cell.input");
  }
  if (cell.value.isOutput) {
    return t("tooltips.cell.output");
  }
  if (isTopic(cell.value)) {
    return (
      <div>
        {t("topic.code")} : {cell.value.key}
        <br />
        {t("topic.name")} : {cell.value.value}
      </div>
    );
  }

  return t("tooltips.cell.default");
};

const Table = props => {
  const {
    periodView: { activity_items },
    setSelectedCell,
    selectedCell,
  } = props;
  const classes = useStyles(props);
  const { t } = useTranslation();

  const columns = useMemo(() => prepareHeaders(activity_items, t), [
    activity_items,
    t,
  ]);

  const data = useMemo(() => prepareData(activity_items, t), [
    activity_items,
    t,
  ]);

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

  const [displayedRows, setDisplayedRows] = useState(rows);

  let filteredRows;
  filteredRows = columns.some(c => c.Header === "Visible")
    ? rows.filter(row => row.values.visible.value === "1")
    : rows;
  filteredRows = columns.some(c => c.Header === "Order")
    ? filteredRows.sort((a, b) => b.values.order.value - a.values.order.value)
    : filteredRows;

  useEffect(() => {
    if (filteredRows.length > 0) {
      setDisplayedRows(filteredRows);
    }
  }, []);

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
          {displayedRows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow key={i} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  const cellProps = cell.getCellProps();
                  return (
                    <Tooltip
                      key={`${cellProps.key}-tooltip-${cellProps.value}`}
                      title={cellTooltip(cell, t)}
                      enterDelay={500}
                    >
                      <TableCell
                        {...cellProps}
                        tabIndex={isTopic(cell.value) ? undefined : "0"}
                        onClick={() => {
                          if (!isTopic(cell.value)) {
                            setSelectedCell(cell.value);
                          }
                        }}
                        classes={{
                          body: cellBg(
                            cell,
                            classes,
                            selectedCell &&
                              (cell.value || {}).key === selectedCell.key,
                          ),
                        }}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    </Tooltip>
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
  periodView: PropTypes.object,
};

export default connect(null, { setSelectedCell })(Table);
