import React from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');
class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentDidUpdate() {}
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
    console.log(this.props);
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOvarlayClick}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} className="Modal_image" />
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
