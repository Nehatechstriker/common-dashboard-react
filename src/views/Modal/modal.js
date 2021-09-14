import React from "react";
import "./modal.css";
import { Modal } from "react-bootstrap"
const Modals = (props) => {
    const divStyle = {
        display: props.displayModal ? "block" : "none",
    };
    function closeModal(e) {
        e.stopPropagation();
        props.closeModal();
    }
    return (
        <Modal show={props.displayModal} onHide={closeModal}>
            <Modal.Header >
                <span className="close pull-right" onClick={closeModal}>
                    &times;
                </span>
            </Modal.Header>
            <Modal.Body>{props.modalBody}</Modal.Body>
        </Modal>

    );
};
export default Modals;
