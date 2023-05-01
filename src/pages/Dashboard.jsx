import React, { useEffect, useState } from "react";
import { DeviceContext } from "../components/DeviceContext";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import AddDevice from "../components/AddDevice";
import EditDevice from "../components/EditDevice";
import RemoveDevice from "../components/RemoveDevice";
import SignOut from "../components/SignOut";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import LightChart from "../components/charts/LightChart";
import DevicePagination from "../components/DevicePagination";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  let [device, setDevice] = useState(null);
  let [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (device) {
      axios
        .get(API_BASE_URL + "/sensorData", {
          data: { deviceId: device._id },
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
    }
  }, [device]);

  return (
    <div className="p-2 bg-body-tertiary border rounded-3">
      <Container fluid>
        <Row>
          <div className="d-flex justify-content-between">
            <DeviceContext.Provider value={[device, setDevice]}>
              <DevicePagination></DevicePagination>
              <ButtonGroup>
                <AddDevice></AddDevice>
                <EditDevice></EditDevice>
                <RemoveDevice></RemoveDevice>
                <SignOut></SignOut>
              </ButtonGroup>
            </DeviceContext.Provider>
          </div>
        </Row>
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
