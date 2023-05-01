import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DoorOpen } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SignOut() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(API_BASE_URL + "/signout", { withCredentials: true })
      .then((response) => {
        localStorage.removeItem("authenticated");
        navigate("/signin");
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

  return (
    <>
      <Button
        variant="warning"
        className="d-flex align-items-center"
        onClick={handleShow}
      >
        <DoorOpen></DoorOpen>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleSubmit}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
