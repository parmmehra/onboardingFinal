import React, { Component } from "react";
import AddSales from "./addSales";
import SalesTable from "./Table";

class Saless extends Component {
  state = {
    FetchData: null,
  };
  render() {
    return (
      <div>
        <AddSales FetchData={(x) => this.setState({ FetchData: x })} />
        <SalesTable FetchData={this.state.FetchData} />
      </div>
    );
  }
}
export default Saless;
