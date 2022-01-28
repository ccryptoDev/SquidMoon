import React from "react";
import "./style.scss";

interface Props {
  children: React.ReactNode;
  show: boolean;
  closeModal: () => void;
}

const BaseModal = (props: Props) => {
  const { children, show, closeModal } = props;

  return (
    <div
      className={`modal fade ${show === true ? "show" : ""}`}
      id="buynow-modal"
      onClick={closeModal}
    >
      <div
        className="modal-dialog"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 id="myModalLabel">Buy It Now</h3>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default BaseModal;
