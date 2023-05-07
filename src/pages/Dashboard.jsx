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
import Chart from "../components/Chart";
import DevicePagination from "../components/DevicePagination";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  let [device, setDevice] = useState(null);
  let [fetching, setFetching] = useState(false);
  let [temperatureSeries, setTemperatureSeries] = useState([]);
  let [humiditySeries, setHumiditySeries] = useState([]);
  let [lightSeries, setLightSeries] = useState([]);

  async function fetchChartData() {
    setFetching(true);
    axios
      .get(API_BASE_URL + "/sensorData", { params: { deviceId: device._id } })
      .then((response) => {
        setTemperatureSeries([
          {
            name: "Temperature",
            data: response.data.map((obj) => {
              return [
                Date.parse(obj.timestamp),
                obj.temperatureReading.value.toFixed(2),
              ];
            }),
          },
        ]);
        setTemperatureSeries([
          {
            name: "Temperature",
            data: response.data.map((obj) => {
              return [
                Date.parse(obj.timestamp),
                obj.temperatureReading.value.toFixed(2),
              ];
            }),
          },
        ]);
        setHumiditySeries([
          {
            name: "Humidity",
            data: response.data.map((obj) => {
              return [
                Date.parse(obj.timestamp),
                obj.humidityReading.value.toFixed(2),
              ];
            }),
          },
        ]);
        setLightSeries([
          {
            name: "Visible + IR",
            data: response.data.map((obj) => {
              return [
                Date.parse(obj.timestamp),
                obj.lightReading.visible_plus_ir_value,
              ];
            }),
          },
          {
            name: "Infrared",
            data: response.data.map((obj) => {
              return [
                Date.parse(obj.timestamp),
                obj.lightReading.infrared_value,
              ];
            }),
          },
        ]);
        setFetching(false);
      })
      .catch(function (error) {
        Swal.fire({
          title: "Error!",
          text: error ? error : "Error",
          icon: "error",
          confirmButtonText: "Okay",
        });
        setFetching(false);
      });
  }

  useEffect(() => {
    fetchChartData();
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
            <Chart series={temperatureSeries} title="Temperature (°C)"></Chart>
          </Col>
          <Col>
            <Chart series={humiditySeries} title="Humidity (%)"></Chart>
          </Col>
          <Col>
            <Chart series={lightSeries} title="Light (Lx)"></Chart>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
