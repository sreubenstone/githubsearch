import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import options from "../options";
import Results from "./Results";

class Search extends Component {
  state = {
    text: null,
    stars: null,
    license: null,
    forked: false,
    data: null,
    loading: false
  };

  async search(e) {
    this.setState({ loading: true });
    e.preventDefault();
    const { text, stars, license, forked } = this.state;
    const keywords = text.split(" ");
    let keywordsearch = "";
    keywords.forEach((item, index) => {
      if (!index) {
        keywordsearch = `${item}`;
        return;
      }
      keywordsearch = `${keywordsearch}+${item}`;
    });

    let fork = "false";
    if (forked) {
      fork = "true";
    }

    const result = await axios.get(
      `https://api.github.com/search/repositories?q=${keywordsearch}+stars:${stars}+license:${license}+fork:${fork}`
    );
    console.log(
      `https://api.github.com/search/repositories?q=${keywordsearch}+stars:${stars}+license:${license}+fork:${fork}`
    );
    console.log(result);
    this.setState({ data: result.data.items, loading: false });
  }

  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = license => {
    this.setState({ license: license.value });
  };

  handleCheck = e => {
    this.setState({ forked: e.target.checked });
  };

  render() {
    const { text, stars, license, data, loading } = this.state;
    return (
      <div>
        <form onSubmit={e => this.search(e)}>
          <input
            name="text"
            type="text"
            onChange={this.handleInput}
            value={text}
            placeholder="body"
          />
          <input
            name="stars"
            type="text"
            onChange={this.handleInput}
            value={stars}
            placeholder="stars query"
          />
          <Select
            options={options}
            value={license}
            onChange={this.handleChange}
          />
          <input name="forked" type="checkbox" onClick={this.handleCheck} />
          <button>Submit</button>
        </form>
        {loading ? "Loading" : null}
        {data ? <Results data={data} /> : null}
      </div>
    );
  }
}

export default Search;
