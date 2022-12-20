import PropTypes from 'prop-types';
const ButtonLoad = ({ onBtnLoad }) => {
  return (
    <button className="Button" type="button" onClick={onBtnLoad}>
      Load more
    </button>
  );
};
ButtonLoad.propTypes = {
  onBtnLoad: PropTypes.func,
};
export default ButtonLoad;
