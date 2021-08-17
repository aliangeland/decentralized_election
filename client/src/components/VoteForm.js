import React from "react";
import { Form, Message } from "semantic-ui-react";

const VoteForm = (props) => {
  return (
    <Form error onSubmit={() => props.handleSubmit()}>
      <Form.Select
        onChange={(e, { value }) => {
          props.selectCandidate(value);
        }}
        label="Select Candidate To Vote"
        placeholder="select"
        options={props.options}
        id="candidateSelect"
        required
      />
      <Form.Checkbox
        onChange={() => props.toggleTermsConfirmation()}
        label="I agree to the Terms and Conditions"
        required
      />
      <Form.Button type="submit" className="vote-submit-button">
        Vote
      </Form.Button>
      {props.formErrors &&
        props.formErrors.map((error, i) => (
          <Message key={i} error header="Validation Error" content={error} />
        ))}
    </Form>
  );
};

export default VoteForm;
