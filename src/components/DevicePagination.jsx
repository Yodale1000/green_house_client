import React, { useEffect, useState, useContext, useMemo } from "react";
import { DeviceContext } from "../components/DeviceContext";
import { Pagination, PageItem } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

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
        Swal.fire({
          title: "Error!",
          text: error ? error : "Error",
          icon: "error",
          confirmButtonText: "Okay",
        });
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
