import React, { Component } from "react";
import { connect } from "react-redux";
import { clearSearchResults, doSearch, addSelection } from "../actions";
import { Search } from "semantic-ui-react";

class SearchArea extends Component {
  render() {
    return (
      <div>
        <label htmlFor="m_search">Search Movie or TV show </label>
        <SearchBox />
      </div>
    );
  }
}

@connect(state => {
  return {
    search_results: state.search_results
  };
})
class SearchBox extends Component {
  resetComponent = () => {
    const { dispatch } = this.props;
    this.setState({ isLoading: false, value: "", showNoResults: false });
    dispatch(clearSearchResults());
  };

  componentWillMount() {
    this.resetComponent();
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  handleSearch = e => {
    if (e.charCode === 13) {
      const { dispatch } = this.props;
      dispatch(doSearch(this.state.value));
    }
  };

  handleSelect = (e, { result }) => {
    const { dispatch } = this.props;
    dispatch(addSelection(result));
    this.resetComponent();
  };

  render() {
    // TODO loading, reset on select
    return (
      <Search
        size="large"
        onResultSelect={this.handleSelect}
        onKeyPress={this.handleSearch}
        onSearchChange={this.handleChange}
        showNoResults={this.state.showNoResults}
        results={this.props.search_results.movies}
        resultRenderer={ResultsRender}
        value={this.state.value}
      />
    );
  }
}

const ResultsRender = props => {
  return <span>{props.title}</span>;
};

export { SearchArea };