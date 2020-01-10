import humanize from "string-humanize";
import React from "react";
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
  return items.sort((a, b) => sortCollator.compare(a.key, b.key));
};

function isTopic(cellValue) {
  return cellValue && !cellValue.hasOwnProperty("is_input");
}

const cellBg = (cell, classes, isCurrent = false) => {
  if (cell.value) {
    return classNames(classes.cell, {
      [classes.is_topic]: isTopic(cell.value || {}),
      [classes.interactable]: cell.value.isInput || cell.value.isOutput,
      [classes.is_input]: cell.value.isInput,
      [classes.is_output]: cell.value.isOutput,
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
    return cell.value.value;
  }

  return t("tooltips.cell.default");
};

const Table = props => {
  const {
    periodView: { activityItems },
    setSelectedCell,
    selectedCell,
  } = props;
  const classes = useStyles(props);
  const { t } = useTranslation();

  const columns = prepareHeaders(activityItems, t);

  const data = prepareData(activityItems, t);

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
                  const cellProps = cell.getCellProps();
                  return (
                    <Tooltip
                      title={cellTooltip(cell, t)}
                      enterDelay={500}
                      open={isTopic(cell.value) ? false : undefined}
                    >
                      <TableCell
                        key={cell.value}
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
  setSelectedCell: PropTypes.func,
  periodView: PropTypes.object,
};

const mapStateToProps = state => ({
  selectedCell: state.ui.selectedCell,
});

export default connect(mapStateToProps, { setSelectedCell })(Table);
