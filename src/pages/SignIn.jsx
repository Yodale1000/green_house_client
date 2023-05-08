import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Container, Button, Spinner, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(API_BASE_URL + "/signin", {
        username,
        password,
      })
      .then((response) => {
        setLoading(false);
        localStorage.setItem("authenticated", true);
        navigate("/dashboard");
      })
      .catch(async function (error) {
        Swal.fire({
          title: "Error!",
          text: error ? error : "Error",
          icon: "error",
          confirmButtonText: "Okay",
        });
        setLoading(false);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit}>
        <div className="h-100 p-5 bg-body-tertiary border rounded-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              {loading ? <Spinner size="sm" /> : "Signin"}
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}
