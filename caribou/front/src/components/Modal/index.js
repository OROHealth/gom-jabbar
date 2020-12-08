import {useDispatch, useSelector} from "react-redux";

import './styles.css';

const Modal = (props) => {
  const dispatch = useDispatch();
  const {content, isVisible} = useSelector(s => s.modal);

  const closeModal = () => {
    dispatch({type: "RESET_MODAL"});
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div>
      <div className="modal-overlay" onClick={() => closeModal()} />
      <div className="custom-modal">
        <div className="modal-content">
          <h1>{props.title}</h1>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
