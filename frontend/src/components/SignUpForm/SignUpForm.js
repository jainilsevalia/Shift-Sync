import React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import FormInput from "./formInput";
import { axios } from "../../utils/axios";
import Path from "../../constants/Path";
import { useDispatch, useSelector } from "react-redux";
import { updateLoginState } from "../../features/user/loginState.reducer";
import { addUser, addUserDetails } from "../../features/user/user.reducer";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((store) => store.loginState.userStatus);
  const userDetails = useSelector((store) => store.user.user);
  const [values, setValues] = useState({
    name: "",
    email: "",
    PIN: "",
    // profilepicture: null,
  });
  const [file, setFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const imageChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilepicture", profilePicture);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("PIN", values.PIN);
    formData.append("Position", values.Position);
    formData.append("role", values.role);
    const addProduct = async () => {
      try {
        await axios({
          method: "post",
          url: "/user/",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            console.log(response);
            dispatch(updateLoginState(true));
            dispatch(addUser(response.data.newImg));
            dispatch(addUserDetails(response.data.newImg));
            navigate(Path.HOME);
            console.log(loginState);
            console.log(userDetails);
          })
          .catch((error) => {
            console.log("error is: " + error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    addProduct();

    console.log(values);
    console.log(file);
    // axios.post("/user", values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <FormInput
          name="name"
          type="text"
          placeholder="Name"
          errorMessage="Name should contains only Characters"
          label="Name"
          pattern="^[A-Za-z ]{1,25}$"
          required
          onChange={onChange}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          errorMessage="Enter valid email only i.e. abc@gmail.com"
          pattern="^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$"
          label="Email"
          required
          onChange={onChange}
        />
        <FormInput
          name="PIN"
          type="password"
          placeholder="PIN"
          errorMessage="PIN should contains numeric values and 4 characters."
          label="PIN"
          pattern="^[0-9]*$"
          required
          onChange={onChange}
        />
        <FormInput
          name="Position"
          type="text"
          placeholder="Position"
          errorMessage="Position should contains only Characters"
          label="Position"
          pattern="^[A-Za-z ]{1,25}$"
          required
          onChange={onChange}
        />
        <FormInput
          name="role"
          type="text"
          placeholder="Role"
          errorMessage="role should contains only one value from [ manager , employee, owner"
          label="Role"
          pattern="^[A-Za-z ]{1,25}$"
          required
          onChange={onChange}
        />
        <FormInput
          name="profilepicture"
          type="file"
          placeholder="Profile Picture"
          errorMessage="Profile Picture is not uploaded"
          label="Profile Picture"
          required
          onChange={imageChange}
          // onChange={(event) => {
          //   onChange();
          //   setFile(event.target.value);
          // }}
        />
        <div className="submit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
