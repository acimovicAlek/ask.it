import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Link
} from "@material-ui/core";

import "./topquestions.css";

export const TopQuestionsList = props => {
  const data = props.hotQuestions
    ? props.hotQuestions.map(q => (
        <TableRow>
          <TableCell><Link href={"/question/"+q._id}>{q.title}</Link></TableCell>
          <TableCell align="right">{q.numberOfUpVotes}</TableCell>
          <TableCell align="right">{q.numberOfDownVotes}</TableCell>
        </TableRow>
      ))
    : [];
  return (
    <div>
      <Typography variant="h5" className="title">
        Top Questions
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Up Votes</TableCell>
            <TableCell align="right">Down Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{data}</TableBody>
      </Table>
    </div>
  );
};
