import React, { useEffect, useState, useContext, useMemo } from "react";
import { DeviceContext } from "../components/DeviceContext";
import { Pagination, PageItem } from "react-bootstrap";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DevicePagination() {
  const [device, setDevice] = useContext(DeviceContext);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/devices")
      .then((response) => {
        setDevices(response.data);
        if (!device) {
          setDevice(response.data[0]);
        } else {
          setDevice(device);
        }
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
  }, [device]);

  const handleDeviceChange = async (event) => {
    event.preventDefault();
    setDevice(devices[event.target.id]);
  };

  return (
    <Pagination className="mb-0">
      {devices.map((item, index) => (
        <PageItem
          id={index}
          key={index}
          active={device ? item._id === device._id : index === 0}
          onClick={handleDeviceChange}
        >
          {item.name}
        </PageItem>
      ))}
    </Pagination>
  );
}
