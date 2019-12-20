import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from "@material-ui/core";

import "./topusers.css"

export const TopUsersList = props => {
  const data = props.topUsers?props.topUsers.map(q => (
    <TableRow>
      <TableCell>{q.username}</TableCell>
      <TableCell align="right">{q.numberOfAnswers}</TableCell>
    </TableRow>
  )):[];
  return (
    <div>
      <Typography variant="h5" className="title">Top Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Answers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{data}</TableBody>
      </Table>
    </div>
  );
};