import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = localStorage.getItem("authenticated");
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;

