import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
const SearchBar = ({ onSubmitForm, onInputChange }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmitForm}>
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
          onChange={onInputChange}
          className="SearchForm-input "
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
SearchBar.propTypes = {
  onSubmitForm: PropTypes.func,
  onInputChange: PropTypes.func,
};
export default SearchBar;
