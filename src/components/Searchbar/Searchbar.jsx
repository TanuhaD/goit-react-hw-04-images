import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Searchbar extends Component {
  static propTypes = {
    setQuery: PropTypes.func.isRequired,
    notifyFunc: PropTypes.func.isRequired,
  };
  state = {
    value: '',
  };
  handleInputChange = evt => {
    this.setState({
      value: evt.currentTarget.value,
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const normalizedQuery = this.state.value.trim();
    if (normalizedQuery) {
      this.props.setQuery(normalizedQuery);
    } else {
      this.props.notifyFunc('Enter query');
    }
  };

  render() {
    return (
      <header className="Searchbar">
        <form
          onSubmit={this.handleSubmit}
          autoComplete="off"
          className="SearchForm"
        >
          <button type="submit" className="SearchForm-button"></button>

          <input
            value={this.state.value}
            onChange={this.handleInputChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
