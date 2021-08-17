let Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {
  it("initializes with two candidates", async () => {
    const contract = await Election.deployed();
    const candidatesCount = await contract.candidatesCount();

    assert.equal(candidatesCount.toNumber(), 2);
  });

  it("initializes the candidates with the correct values", async () => {
    const contract = await Election.deployed();
    // testing first candidate
    const candidate1 = await contract.candidates(1);
    assert.equal(candidate1[0], 1, "contains the correct id"); // testing id
    assert.equal(candidate1[1], "Candidate #1", "contains the correct name"); // testing name
    assert.equal(candidate1[2], 0, "contains the correct votes count"); // testing voteCount
    // testing second candidate
    const candidate2 = await contract.candidates(2);
    assert.equal(candidate2[0], 2, "contains the correct id");
    assert.equal(candidate2[1], "Candidate #2", "contains the correct name");
    assert.equal(candidate2[2], 0, "contains the correct votes count");
  });

  it("allows a voter to cast a vote", async () => {
    const contract = await Election.deployed();
    const candidateId = 1;
    const receipt = await contract.vote(candidateId, { from: accounts[0] });
    assert.equal(receipt.logs.length, 1, "an event was triggered");
    assert.equal(
      receipt.logs[0].event,
      "votedEvent",
      "the event type is correct"
    );
    assert.equal(
      receipt.logs[0].args._candidateId,
      candidateId,
      "the candidate id is correct"
    );
    const voterAccount = await contract.voters(accounts[0]);
    assert(voterAccount, "the voter was marked as voted");
    const candidate = await contract.candidates(candidateId);
    const candidateVoteCount = candidate[2].toNumber();
    assert.equal(candidateVoteCount, 1, "increments the candidate's voteCount");
  });

  it("throws exception for invalid candidates", async () => {
    const contract = await Election.deployed();
    return contract
      .vote(99, { from: accounts[2] })
      .then(assert.fail)
      .catch(async (error) => {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
        const candidate1 = await contract.candidates(1);
        const candidate1VoteCount = candidate1[2].toNumber();
        const candidate2 = await contract.candidates(2);
        const candidate2VoteCount = candidate2[2].toNumber();
        assert.equal(
          candidate1VoteCount,
          1,
          "candidate 1 didn't receive any votes"
        );
        assert.equal(
          candidate2VoteCount,
          0,
          "candidate 2 didn't receive any votes"
        );
      });
  });

  it("throws an exception for double voting", async () => {
    const contract = await Election.deployed();
    const candidateId = 2;
    await contract.vote(candidateId, { from: accounts[5] });
    let candidate2 = await contract.candidates(candidateId);
    let candidate2VoteCount = candidate2[2];
    assert.equal(candidate2VoteCount, 1, "accepts first vote");
    // try to vote again with same account address
    return contract
      .vote(candidateId, { from: accounts[5] })
      .then(assert.fail)
      .catch(async (error) => {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
        const candidate1 = await contract.candidates(1);
        const candidate1VoteCount = candidate1[2].toNumber();
        const candidate2 = await contract.candidates(2);
        const candidate2VoteCount = candidate2[2].toNumber();
        assert.equal(
          candidate1VoteCount,
          1,
          "candidate 1 didn't receive any votes"
        );
        assert.equal(
          candidate2VoteCount,
          1,
          "candidate 2 didn't receive any votes"
        );
      });
  });
});
