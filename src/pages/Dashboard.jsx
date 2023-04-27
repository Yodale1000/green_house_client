import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Pagination,
  PageItem,
} from "react-bootstrap";
import axios from "axios";
import AddDevice from "../components/AddDevice";
import EditDevice from "../components/EditDevice";
import RemoveDevice from "../components/RemoveDevice";
import SignOut from "../components/SignOut";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import LightChart from "../components/charts/LightChart";

const HOST = import.meta.env.API_HOST || "http://localhost:8000";

export default function Dashboard() {
  let [devices, setDevices] = useState([]);
  let [currentDevice, setCurrentDevice] = useState(null);

  useEffect(() => {
    axios
      .get(HOST + "/devices")
      .then((response) => {
        setDevices(response.data);
        setCurrentDevice(response.data[0]);
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
  }, []);

  const handleDeviceChange = async (event) => {
    event.preventDefault();
    setCurrentDevice(devices[event.target.id]);
  };

  if (devices && currentDevice) {
    return (
      <div className="p-2 bg-body-tertiary border rounded-3">
        <Container fluid>
          <Row className="text-center">
            <h1>{currentDevice["name"]}</h1>
          </Row>
          <Row>
            <div className="d-flex justify-content-between">
              <Pagination className="mb-0">
                {devices.map((item, index) => (
                  <PageItem
                    id={index}
                    key={index}
                    active={item.name === currentDevice.name}
                    onClick={handleDeviceChange}
                  >
                    {item.name}
                  </PageItem>
                ))}
              </Pagination>
              <ButtonGroup>
                <AddDevice></AddDevice>
                <EditDevice currentDevice={currentDevice}></EditDevice>
                <RemoveDevice currentDevice={currentDevice}></RemoveDevice>
                <SignOut></SignOut>
              </ButtonGroup>
            </div>
          </Row>

          <hr></hr>
          <Row>
            <Col>
              <TemperatureChart device={currentDevice}></TemperatureChart>
            </Col>
            <Col>
              <HumidityChart device={currentDevice}></HumidityChart>
            </Col>
            <Col>
              <LightChart device={currentDevice}></LightChart>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
