import React, { Component } from "react";

class Search extends Component {
  componentDidUpdate(prevProps) {
    const { text, starred, license, forked } = this.props;
    if (
      prevProps.text === text &&
      prevProps.starred === starred &&
      prevProps.license === license &&
      prevProps.forked === forked
    ) {
      return;
    }
    this.search();
  }

  render() {
    return this.props.data.map(item => {
      return (
        <div>
          <div>{item.name}</div>
        </div>
      );
    });
  }
}

export default Search;
