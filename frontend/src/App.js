import React, { useEffect } from "react";
import "./App.css";
import Navbarfun from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Path from "./constants/Path";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoutes from "./utils/PrivateRoutes";
import { axios } from "./utils/axios";
import {
  addUser,
  addUserDetails,
  deleteUser,
} from "./features/user/user.reducer";
import SignUpForm from "./components/SignUpForm/SignUpForm";

function App() {
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.user.user);
  useEffect(() => {
    const getUser = () => {
      if (userDetails?.length === 0) {
        axios.get("/user/").then((response) => {
          if (response.data.message !== "Invalid token") {
            dispatch(addUser(response.data));
            dispatch(addUserDetails(response.data));
          } else {
            dispatch(deleteUser());
          }
        });
      }
    };
    getUser();
  }, []);

  const userDetail = useSelector((store) => store.user.user);

  return userDetail?.length === 0 ? (
    <Routes>
      <Route path={Path.LOGIN} element={<Login />} />
      <Route path={Path.SIGNUP} element={<SignUpForm />} />
      <Route path="/*" element={<Navigate to={Path.LOGIN} />} />
    </Routes>
  ) : (
    <>
      <Navbarfun />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={Path.HOME} element={<Home />} exact />
          <Route path="/*" element={<Navigate to={Path.HOME} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
