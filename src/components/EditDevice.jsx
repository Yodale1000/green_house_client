import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";

export default function EditDevice(currentDevice) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="info"
        className="d-flex align-items-center"
        onClick={handleShow}
      >
        <Gear></Gear>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            disabled={currentDevice ? true : false}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
