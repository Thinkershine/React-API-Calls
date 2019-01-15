import React, { Component } from "react";

class Table extends Component {
  state = {};

  constructor(props) {
    super(props);
  }
  //   list={result.hits}
  //   pattern={searchTerm}
  displayResults() {
    const results = this.props.list.map(result => {
      return (
        <tr key={result.objectID}>
          <td>{result.author.toUpperCase()}</td>
          <td>
            <a href={result.url} target="_blank">
              {result.title}
            </a>
          </td>
          <td>{result.points}</td>
        </tr>
      );
    });

    return results;
  }
  //   onDismiss={this.onDismiss}
  render() {
    return (
      <React.Fragment>
        <h2>Search Phrase : {this.props.pattern}</h2>
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>URL</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{this.displayResults()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
