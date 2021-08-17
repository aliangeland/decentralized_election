import React from "react";

import VoteTable from "./VoteTable";
import VoteForm from "./VoteForm";

import { Grid, Message } from "semantic-ui-react";

const VoteWrapper = (props) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <VoteTable votes={props.candidates} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4} textAlign="left">
          {props.isVoted ? (
            <Message
              success
              header="Thank You!"
              content={`You have Voted for ${
                props.renderSelectedCandidate(props.selectedCandidate).name
              }`}
            />
          ) : (
            <VoteForm
              options={props.options}
              selectedCandidate={props.selectedCandidate}
              selectCandidate={props.selectCandidate}
              termsAccepted={props.termsAccepted}
              toggleTermsConfirmation={props.toggleTermsConfirmation}
              handleSubmit={props.handleSubmit}
              formErrors={props.formErrors}
              setFormErrors={props.setFormErrors}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default VoteWrapper;
