import React from "react";
import Table from "@material-ui/core/Table";
import Skeleton from "@material-ui/lab/Skeleton";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";

const columns = [
  {
    id: "place",
    align: "center",
    label: "Place",
    minWidth: 100
  },
  {
    id: "name",
    align: "center",
    label: "Name",
    minWidth: 100
  },
  {
    id: "artist",
    label: "Artist",
    minWidth: 100,
    align: "center",
    format: value => value.toLocaleString()
  },
  {
    id: "arg1",
    label: "Arg1",
    minWidth: 100,
    align: "center",
    format: value => value.toLocaleString()
  },
  {
    id: "arg2",
    label: "Arg2",
    minWidth: 100,
    align: "center",
    format: value => value.toFixed(2)
  }
];

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function StickyHeadTable() {
  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map(column => {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      <Skeleton variant="rect" fullWidth />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
