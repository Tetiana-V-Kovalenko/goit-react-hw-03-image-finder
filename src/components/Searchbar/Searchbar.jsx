import { FaSearch } from 'react-icons/fa';
import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
class SearchBar extends React.Component {
  state = {
    query: '',
  };

  onInputChange = e => {
    this.setState({ query: e.target.value });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmitForm}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">
              <IconContext.Provider
                value={{
                  size: '30px',

                  className: 'global-class-name',
                }}
              >
                <FaSearch />
              </IconContext.Provider>
            </span>
          </button>

          <input
            onChange={this.onInputChange}
            className="SearchForm-input "
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.query}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
};
export default SearchBar;
