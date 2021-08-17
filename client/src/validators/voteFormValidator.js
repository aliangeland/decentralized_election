export const voteFormValidator = (candidates, ...inputs) => {
  const selectedCandidate = inputs[0];
  const termsAccepted = inputs[1];

  const errors = [];

  if (!selectedCandidateIsValid(selectedCandidate, candidates))
    errors.push("Selected candidate is not valid!");

  if (!termsAccepted) errors.push("Terms and Conditions are not confirmed!");

  return errors.length > 0 ? errors : true;
};

const selectedCandidateIsValid = (selectedCandidate, candidates) => {
  return (
    candidates.filter((candidate) => candidate.id === selectedCandidate)
      .length === 1
  );
};
