import React, { useState, useContext } from "react";
import { DeviceContext } from "./DeviceContext";
import { Button, Modal, Form } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function EditDevice() {
  const [device, setDevice] = useContext(DeviceContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .patch(API_BASE_URL + "/device", {
        deviceId: device._id,
        deviceName: name,
        deviceLocation: location,
      })
      .then((response) => {
        setDevice(response.data);
        handleClose();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  if (device) {
    return (
      <>
        <Button
          variant="secondary"
          className="d-flex align-items-center"
          onClick={handleShow}
        >
          <Gear></Gear>
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Device</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={device.name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={device.location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>API Token</Form.Label>
                <Form.Control type="text" value={device.apiToken} readOnly />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}
