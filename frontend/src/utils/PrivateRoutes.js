import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let userDetails = useSelector((store) => store.user.user);
  console.log("INSIDE PRIVATE ROUTE");

  return userDetails?.length !== 0 ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
