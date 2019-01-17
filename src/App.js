import React, { Component } from "react";
import "./App.css";
import Table from "./components/table";
// import Search from "./components/search";

// USED API - HACKER NEWS
// https://hn.algolia.com/api
const DEFAULT_QUERY = "";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

// TEMPLATE LITERALS ES6
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      coinSearchPhrase: ""
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    this.paprika = "";
    this.coinToDisplay = "";
    this.coins = "";
    this.searchCoin = this.searchCoin.bind(this);
    this.updateSearchPhrase = this.updateSearchPhrase.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopstories(searchTerm);
    this.getCoinPaprika();
    this.fetchCoins();
  }

  setSearchTopstories(result) {
    const { searchKey } = this.state;

    this.setState({ result, searchKey });
  }

  // Method for Fetching Data Through API Call - FETCH API
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  fetchSearchTopstories(searchTerm) {
    // Native Fetch Needs URL as Argument
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      // Then... the Response must become JSON
      .then(response => response.json())
      // And Then... Can be Saved
      .then(result => this.setSearchTopstories(result));
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
    event.preventDefault();
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
    event.preventDefault();
  }

  onDismiss() {
    console.log("ON DISMISS");
  }

  getCoinPaprika() {
    fetch(`https://api.coinpaprika.com/v1/global`)
      .then(response => response.json())
      .then(result => this.setState({ paprika: result }));
  }

  fetchCoin(ticker) {
    fetch(`https://api.coinpaprika.com/v1/coins/` + ticker)
      .then(response => response.json())
      .then(result => this.setState({ coinToDisplay: result }));
  }

  fetchCoins() {
    fetch(`https://api.coinpaprika.com/v1/coins`)
      .then(response => response.json())
      .then(result =>
        this.setState({ coins: result }, () =>
          console.log("COINS", this.state.coins)
        )
      );
  }

  searchCoin(event) {
    console.log("NEW COIN", this.state.coinSearchPhrase);
    this.fetchCoin(this.state.coinSearchPhrase);
    event.preventDefault();
  }

  updateSearchPhrase(event) {
    console.log("SEARCH PHRASE UPDATED", event.target.value);
    this.setState({ coinSearchPhrase: event.target.value });
    event.preventDefault();
  }

  displayCoins() {
    let coinsToDisplay = "";
    if (this.state.coins.length > 1) {
      coinsToDisplay = this.state.coins.map(coin => {
        return <li key={coin.id}>{coin.name}</li>;
      });
    }

    return coinsToDisplay;
  }

  render() {
    const { searchTerm, result, paprika } = this.state;

    if (!result) {
      return null;
    }

    return (
      <div className="App">
        <header>
          <h1>Let's Call Some API!</h1>
        </header>
        <div>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            <p>Search</p>
          </Search>
        </div>
        <div>
          RESULT:
          <Table
            list={result.hits}
            //  pattern={searchTerm}
            //  onSearch={this.onSearchSubmit}
            onDismiss={this.onDismiss}
          />
        </div>
        <h3>Paprika</h3>
        <p>Market CAP: {paprika.market_cap_usd}</p>
        <p>VOLUME: {paprika.volume_24h_usd}</p>
        <p>BTC Dominange: {paprika.bitcoin_dominance_percentage}</p>

        <form onSubmit={this.searchCoin}>
          <input
            type="text"
            name="name"
            value={this.state.coinSearchPhrase}
            onChange={this.updateSearchPhrase}
          />
          <input type="submit" value="Search Coin" />
        </form>
        <h3>COINS : {this.state.coins != "" && this.state.coins.length}</h3>
        <ul>{this.displayCoins()}</ul>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" name="name" value={value} onChange={onChange} />
    <input type="submit" value="SEARCH" />
  </form>
);

export default App;
