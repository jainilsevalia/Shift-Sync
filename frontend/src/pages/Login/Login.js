import React, { useState } from "react";
import { axios } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import "./Login.styles.css";
import Path from "../../constants/Path";
import InputField from "../../components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateLoginState } from "../../features/user/loginState.reducer";
import { addUser, addUserDetails } from "../../features/user/user.reducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((store) => store.loginState.userStatus);
  const userDetails = useSelector((store) => store.user.user);

  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log(formValues.username);
    console.log(formValues.password);
    console.log(formValues);
    e.preventDefault();
    axios
      .post("/auth/login", {
        email: formValues.username,
        PIN: formValues.password,
      })
      .then((response) => {
        if (response.data.message === "Login successful") {
          dispatch(updateLoginState(true));
          dispatch(addUser(response.data.user));
          dispatch(addUserDetails(response.data.user));
          navigate(Path.HOME);
          console.log(loginState);
          console.log(userDetails);
        } else {
          alert("Invalid Credentials");
        }
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div className="container_login">
        <div className="card_login">
          <div className="card-header">
            <label>Login</label>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="login_form">
              <InputField
                label="Email"
                type="text"
                id="username"
                required
                value={formValues.username}
                handleChange={handleChange}
                name="username"
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                required
                value={formValues.password}
                handleChange={handleChange}
                name="password"
              />
              <button className="login_button" type="submit">
                Submit
              </button>
            </form>
            <button
              className="login_button"
              onClick={() => {
                navigate(Path.SIGNUP);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
