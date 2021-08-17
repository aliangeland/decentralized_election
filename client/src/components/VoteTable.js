import React from "react";
import { Table } from "semantic-ui-react";

const VoteTable = (props) => {
  const VoteRows = props.votes.map((candidate) => (
    <Table.Row key={candidate.id.toString()}>
      <Table.Cell>{candidate.id}</Table.Cell>
      <Table.Cell>{candidate.name}</Table.Cell>
      <Table.Cell>{candidate.voteCount}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">#</Table.HeaderCell>
          <Table.HeaderCell scope="col">Name</Table.HeaderCell>
          <Table.HeaderCell scope="col">Vote Count</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body id="candidatesResults">{VoteRows}</Table.Body>
    </Table>
  );
};

export default VoteTable;
