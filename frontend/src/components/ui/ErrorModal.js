import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//not in use at the moment; using <Alert> component instead
const ErrorModal = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    return () => {
      setShow(true);
    };
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
