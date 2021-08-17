import React, { useState, useEffect, useContext } from "react";

import VoteWrapper from "../components/VoteWrapper";

import { GlobalContext } from "../contexts/GlobalState";

import { voteFormValidator } from "../validators/voteFormValidator";

const Votes = (props) => {
  const { contract, account, isVoted, setVoted } = useContext(GlobalContext);
  const [selectedCandidate, selectCandidate] = useState(null);
  const [termsAccepted, confirmTerms] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const options = props.candidates.map((candidate) => {
    return {
      key: candidate.id.toString(),
      text: candidate.name,
      value: candidate.id,
    };
  });

  async function castVote() {
    const candidateId = selectedCandidate;
    return await contract.methods.vote(candidateId).send({ from: account });
  }

  async function listenForEvents() {
    const contract = await contract.deployed();
    contract.methods
      .votedEvent(
        {},
        {
          fromBlock: 0,
          toBlock: "latest",
        }
      )
      .call()
      .watch(function (error, event) {
        console.log("event triggered: " + event);
        if (event) return true;
      });
  }

  useEffect(() => {
    console.log(selectedCandidate, termsAccepted);
  }, [selectedCandidate, termsAccepted]);

  async function handleSubmit() {
    const validationResult = voteFormValidator(
      props.candidates,
      selectedCandidate,
      termsAccepted
    );

    if (Array.isArray(validationResult)) {
      setFormErrors(validationResult);
    } else {
      setFormErrors(null);
      try {
        const result = await castVote();
        // const eventTriggered = await listenForEvents()
        if (result) {
          setVoted(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  function toggleTermsConfirmation() {
    return confirmTerms(!termsAccepted);
  }

  function renderSelectedCandidate(selectedCandidate) {
    let candidate = props.candidates.filter(
      (candidate) => (selectedCandidate = candidate.id)
    );
    return candidate[0];
  }

  return (
    <VoteWrapper
      candidates={props.candidates}
      isVoted={isVoted}
      renderSelectedCandidate={renderSelectedCandidate}
      options={options}
      selectedCandidate={selectedCandidate}
      selectCandidate={selectCandidate}
      termsAccepted={termsAccepted}
      toggleTermsConfirmation={toggleTermsConfirmation}
      handleSubmit={handleSubmit}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
    />
  );
};

export default Votes;
