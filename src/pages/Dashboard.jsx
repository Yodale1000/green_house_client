import React, { useEffect, useState } from "react";
import { DeviceContext } from "../components/DeviceContext";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import { ArrowClockwise } from "react-bootstrap-icons";
import axios from "axios";
import AddDevice from "../components/AddDevice";
import EditDevice from "../components/EditDevice";
import RemoveDevice from "../components/RemoveDevice";
import SignOut from "../components/SignOut";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import LightChart from "../components/charts/LightChart";
import DevicePagination from "../components/DevicePagination";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  let [device, setDevice] = useState(null);
  let [chartData, setChartData] = useState([]);
  let [fetching, setFetching] = useState(false);

  async function fetchChartData() {
    setFetching(true);
    axios
      .get(API_BASE_URL + "/sensorData", { params: { deviceId: device._id } })
      .then((response) => {
        setFetching(false);
        setChartData(response.data);
      })
      .catch(function (error) {
        setFetching(false);
        Swal.fire({
          title: "Error!",
          text: error ? error : "Error",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  }

  useEffect(() => {
    if (device) {
      fetchChartData();
    }
  }, [device]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container fluid className="p-2 bg-body-tertiary border rounded-3 m-3">
        <Row>
          <div className="d-flex justify-content-between">
            <DeviceContext.Provider value={[device, setDevice]}>
              <DevicePagination></DevicePagination>
              <ButtonGroup>
                <Button
                  className="d-flex align-items-center"
                  variant="info"
                  onClick={fetchChartData}
                >
                  {fetching ? <Spinner size="sm" /> : <ArrowClockwise />}
                </Button>
                <AddDevice></AddDevice>
                <EditDevice></EditDevice>
                <RemoveDevice></RemoveDevice>
                <SignOut></SignOut>
              </ButtonGroup>
            </DeviceContext.Provider>
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
