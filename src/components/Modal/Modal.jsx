import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleOvarlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOvarlayClick}>
        <div className="Modal">
          <img
            src={largeImageURL}
            alt={largeImageURL}
            className="Modal_image"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  largeImageURL: PropTypes.string,

  onClose: PropTypes.func,
};
export default Modal;
