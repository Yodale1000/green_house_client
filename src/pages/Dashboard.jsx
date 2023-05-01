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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  let [devices, setDevices] = useState([]);
  let [currentDevice, setCurrentDevice] = useState(null);
  let [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/devices")
      .then((response) => {
        setDevices(response.data);
        setCurrentDevice(response.data[0]);
        getChartData(response.data[0].name);
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

  const getChartData = (deviceName) => {
    axios
      .get(API_BASE_URL + "/sensorData", {
        params: { deviceName: deviceName },
      })
      .then((response) => {
        setChartData(response.data);
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

  const handleDeviceChange = async (event) => {
    event.preventDefault();
    setCurrentDevice(devices[event.target.id]);
  };

  if (devices && currentDevice && chartData) {
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
              <TemperatureChart data={chartData}></TemperatureChart>
            </Col>
            <Col>
              <HumidityChart data={chartData}></HumidityChart>
            </Col>
            <Col>
              <LightChart data={chartData}></LightChart>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
