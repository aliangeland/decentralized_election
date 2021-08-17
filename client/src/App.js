import React, { useState, useEffect, useContext } from "react";
import Election from "./contracts/Election.json";
import getWeb3 from "./getWeb3";

import { GlobalContext } from "./contexts/GlobalState";

import {
  Container,
  Grid,
  GridRow,
  Segment,
  GridColumn,
  Header,
  ListItem,
  List,
} from "semantic-ui-react";

import Navbar from "./components/Navbar";
import Votes from "./containers/Votes";

import "./App.css";

const App = () => {
  const { contract, setContract, account, setAccount, isVoted, setVoted } =
    useContext(GlobalContext);
  const [loadingContent, setLoadingContent] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [web3, setWeb3] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Election.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          Election.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3);
        setAccount(accounts[0]);
        setContract(contractInstance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      // Load contract data
      let candidatesCount = await contract.methods.candidatesCount().call();

      const candidates = [];

      // Load votes
      for (let i = 1; i <= candidatesCount; i++) {
        let candidate = await contract.methods.candidates(i).call();
        let id = candidate[0];
        let name = candidate[1];
        let voteCount = candidate[2];

        candidates.push({
          id,
          name,
          voteCount,
        });
      }

      const isVoted = await contract.methods.voters(account).call();
      if (isVoted) setVoted(true);

      setCandidates(candidates);
      setLoadingContent(false);
    };

    if (
      typeof web3 !== "undefined" &&
      typeof account !== "undefined" &&
      typeof contract.methods !== "undefined"
    ) {
      load();
    }
  }, [web3, account, contract, isVoted]);

  if (web3 === "undefined") {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <Container className="App">
      <Grid>
        {/* <Grid.Row>
          <Grid.Column>
            <Segment>
              <Navbar />
            </Segment>
          </Grid.Column>
        </Grid.Row> */}
        <GridRow>
          <GridColumn>
            <Segment>
              <Header className="text-center">Election Results</Header>
            </Segment>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Segment>
              {loadingContent ? (
                <div id="loader">
                  <p className="text-center">Loading...</p>
                  <div>
                    <RenderedList numbers={numbers} />
                  </div>
                </div>
              ) : (
                <Votes candidates={candidates} />
              )}
            </Segment>
            <Segment>
              <p id="accountAddress" className="text-center">
                <b>Connected Account Address: </b>
                {account}
              </p>
            </Segment>
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
};

const numbers = [1, 2, 3];

const RenderedList = (props) => {
  const numbers = props.numbers;
  const items = numbers.map((number) => (
    <Item key={number.toString()} value={number} />
  ));
  return <List ordered={false}>{items}</List>;
};

const Item = (props) => <ListItem>{props.value}</ListItem>;

export default App;
