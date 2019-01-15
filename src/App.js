import React, { Component } from "react";
import "./App.css";
import Table from "./components/table";

// USED API - HACKER NEWS
// https://hn.algolia.com/api
const DEFAULT_QUERY = "redux";
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
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopstories(result) {
    this.setState({ result });
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

  onSearchChange() {
    console.log("CHANGE SEARCH");
  }

  onDismiss() {
    console.log("ON DISMISS");
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  render() {
    const { searchTerm, result } = this.state;

    if (!result) {
      return null;
    }

    console.log("RESUUL", this.state.result);

    return (
      <div className="App">
        <header>
          <h1>Let's Call Some API!</h1>
        </header>
        <div>
          RESULT:
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

export default App;
