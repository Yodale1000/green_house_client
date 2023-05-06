import React, { useState, useContext } from "react";
import { DeviceContext } from "./DeviceContext";
import { Button, Modal, Form } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AddDevice() {
  const [device, setDevice] = useContext(DeviceContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(API_BASE_URL + "/device", {
        deviceName: name,
        deviceLocation: location,
      })
      .then((response) => {
        setDevice(response.data);
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
        variant="primary"
        className="d-flex align-items-center"
        onClick={handleShow}
      >
        <PlusCircle></PlusCircle>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Device</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Device Name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Device Location"
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
