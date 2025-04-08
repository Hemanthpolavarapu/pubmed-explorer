import React from 'react';
import './SearchForm.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isFocused: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query.trim()) {
      this.props.onSearch(this.state.query);
    }
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <div className={`search-container ${this.state.isFocused ? 'focused' : ''}`}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="Search PubMed articles..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default SearchForm; 