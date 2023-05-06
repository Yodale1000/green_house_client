import React, { useState, useContext } from "react";
import { DeviceContext } from "./DeviceContext";
import { Button, Modal } from "react-bootstrap";
import { DashCircle } from "react-bootstrap-icons";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RemoveDevice() {
  const [device, setDevice] = useContext(DeviceContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .delete(API_BASE_URL + "/device", { data: { deviceId: device._id } })
      .then((response) => {
        setDevice(null);
        handleClose();
      })
      .catch(function (error) {
        Swal.fire({
          title: "Error!",
          text: error ? error : "Error",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

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
          <Button variant="danger" type="submit" onClick={handleSubmit}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
