pragma solidity >=0.4.22 <0.8.0;

contract Election {
    // Model a candidate
    struct Candidate {
        uint8 id;
        string name;
        uint32 voteCount;
    }

    // store accounts that have voted (the mapping takes an address and returns a boolean)
    mapping(address => bool) public voters;
    // Store candidates (to be developed)
    // Fetch candidate (the mapping takes an integer which is candidate Id here and returns Candidate)
    mapping(uint8 => Candidate) public candidates;

    // Store candidates count
    uint8 public candidatesCount;

    // voted event
    event votedEvent(uint8 indexed _candidateId);

    // Constructor
    constructor() public {
        addCandidate("Candidate #1");
        addCandidate("Candidate #2");
    }

    /* 
        we use private because we would only use it in constructor and smart contract itself 
        and we wouldn't let any other external accounts to access it
    */
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    /* 
        as opposite of above, we have set this function to public so that any external account
        can access it
    */
    function vote(uint8 _candidateId) public {
        // check if they haven't voted before ("require" hinders the code from execution if the condition is false)
        require(!voters[msg.sender]);

        // chech if candidate is valid
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record the address of that voter has voted
        voters[msg.sender] = true;

        // update candidate voteCount
        candidates[_candidateId].voteCount++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
