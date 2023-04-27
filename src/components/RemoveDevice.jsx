import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DashCircle } from "react-bootstrap-icons";

export default function RemoveDevice(currentDevice) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="danger"
        className="d-flex align-items-center"
        onClick={handleShow}
      >
        <DashCircle></DashCircle>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this device and its collected data?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={handleClose}
            disabled={currentDevice ? true : false}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
