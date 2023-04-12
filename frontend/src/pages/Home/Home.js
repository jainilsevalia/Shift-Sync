import React, { useState, Fragment, useEffect } from "react";
import "./Home.styles.css";
import InputFiled from "../../components/InputField/InputField";
import data from "../../utils/mock-data.json";
import Button from "react-bootstrap/Button";
import ReadOnlyRow from "../../components/ReadOnlyRow/ReadOnlyRow";
import EditRow from "../../components/EditRow/EditRow";
import { useSelector } from "react-redux";
import { axios } from "../../utils/axios";

const Home = () => {
  const userDetail = useSelector((store) => store.user.userDetail);
  const [userShiftInfo, setUserShiftInfo] = useState(data);

  const [allUserShiftInfo, setAllUserShiftInfo] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionKey, setSelectedOptionKey] = useState("");
  const [isShiftDeleted, setIsShiftDeleted] = useState(false);
  const [formValues, setFormValues] = useState({
    empName: selectedOption,
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues((values) => ({ ...values, [name]: value }));
  };

  const handleDropdownChange = (e) => {
    const options = JSON.parse(e.target.value);
    setSelectedOption(options.value);
    setSelectedOptionKey(options.id);
    console.log(options.value);
    console.log(options.id);
    console.log(e.target.value);
    setFormValues((values) => ({ ...values, empName: options.value }));
  };

  useEffect(() => {
    axios
      .get("/shift/getAllShift", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setAllUserShiftInfo(response.data.latestShifts);
          setAllUserList(response.data.userList);
          setIsShiftDeleted(false);
          setIsEdited(false);
        } else {
          console.log("Inside else");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isShiftDeleted, isEdited]);

  const handleSubmit = (e) => {
    console.log("INSIDE HANDLE SUBMIT");
    console.log(selectedOptionKey);
    e.preventDefault();
    const newUserShiftInfo = {
      user_id: selectedOptionKey,
      startDate: "2023-05-05T14:10:30Z",
      endDate: "2023-05-11T14:10:30Z",
      name: formValues.empName,
      monday: {
        startTime: formValues.mondayStart,
        startTimeAbbreviations: "AM",
        endTime: formValues.mondayEnd,
        endTimeAbbreviations: "PM",
      },
      tuesday: {
        startTime: formValues.tuesdayStart,
        startTimeAbbreviations: "AM",
        endTime: formValues.tuesdayEnd,
        endTimeAbbreviations: "PM",
      },
      wednesday: {
        startTime: formValues.wednesdayStart,
        startTimeAbbreviations: "AM",
        endTime: formValues.wednesdayEnd,
        endTimeAbbreviations: "PM",
      },
      thursday: {
        startTime: formValues.thursdayStart,
        startTimeAbbreviations: "AM",
        endTime: formValues.thursdayEnd,
        endTimeAbbreviations: "PM",
      },
      friday: {
        startTime: formValues.fridayStart,
        startTimeAbbreviations: "AM",
        endTime: formValues.fridayEnd,
        endTimeAbbreviations: "PM",
      },
      saturday: {
        startTime: formValues.saturdayStart,
        startTimeAbbreviations: "AM",
        endTime: formValues.saturdayEnd,
        endTimeAbbreviations: "PM",
      },
      sunday: {
        startTime: formValues.sundayStart,
        startTimeAbbreviations: "AM",
        endTime: formValues.saturdayEnd,
        endTimeAbbreviations: "PM",
      },
    };

    console.log(formValues);
    console.log(selectedOption);

    axios
      .post("/shift/addShift", newUserShiftInfo)
      .then((response) => {
        const addedShift = response.data;
        const newUserShiftInfoList = [...allUserShiftInfo, addedShift];
        setAllUserShiftInfo(newUserShiftInfoList);
      })
      .catch((error) => console.log(error));
  };

  const [editableState, setEditableState] = useState(null);
  const [editFormValues, setEditFormValues] = useState({
    empName: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  const handleEditChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    console.log(name);
    const parent = name.split("-")[0];
    console.log(parent);
    const child = name.split("-")[1];
    console.log(child);
    const value = e.target.value;

    if (child === undefined) {
      setEditFormValues((values) => ({
        ...values,
        [parent]: value,
      }));
    } else {
      setEditFormValues((values) => ({
        ...values,
        [parent]: {
          ...editFormValues[parent],
          [child]: value,
        },
      }));
    }
  };

  const handleEditSubmit = (event) => {
    console.log("++++++++++++++++");
    console.log(editFormValues);
    event.preventDefault();

    axios
      .put(`/shift/updateShift/${editFormValues._id}`, editFormValues)
      .then((response) => {
        setIsEdited(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setEditableState(null);
  };

  const handleEditClick = (e, user) => {
    e.preventDefault();
    console.log("----------------------------------");
    console.log(user);
    setEditableState(user._id);

    axios
      .get(`/shift/getShift/${user._id}`)
      .then((respone) => {
        setEditFormValues(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancle = () => {
    setEditableState(null);
  };

  const handleDelete = (deleteUserId) => {
    axios
      .delete(`/shift/deleteShift/${deleteUserId}`)
      .then((respone) => {
        setIsShiftDeleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const options = allUserList
    .filter(
      (user) => !allUserShiftInfo.some((shift) => shift.user_id === user._id)
    )
    .map((item) => (
      <option
        key={item.id}
        value={`{"id":"${item._id}", "value":"${item.name}"}`}
      >
        {item.name}
      </option>
    ));

  return (
    <div className="app-container">
      <h1>Time Schedule</h1>
      <div>
        <form onSubmit={handleEditSubmit}>
          <table className="table-main">
            <thead>
              <tr>
                <th className="th-header">Name</th>
                <th className="th-header">Monday</th>
                <th className="th-header">Tuesday</th>
                <th className="th-header">Wednesday</th>
                <th className="th-header">Thursday</th>
                <th className="th-header">Friday</th>
                <th className="th-header">Saturday</th>
                <th className="th-header">Sunday</th>
                {userDetail?.role === "manager" ||
                userDetail?.role === "owner" ? (
                  <th className="th-header">Action</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {allUserShiftInfo.map((user) => (
                <Fragment>
                  {editableState === user._id &&
                  (userDetail?.role === "manager" ||
                    userDetail?.role === "owner") ? (
                    <EditRow
                      editFormValues={editFormValues}
                      handleEditChange={handleEditChange}
                      handleCancle={handleCancle}
                    />
                  ) : (
                    <ReadOnlyRow
                      userName={allUserList.map((userName) => {
                        if (user.user_id === userName._id) {
                          return userName.name;
                        } else {
                          return null;
                        }
                      })}
                      profilePic={allUserList
                        .filter((img) => user.user_id === img._id)
                        .map((img) => img.profilePicture)}
                      user={user}
                      handleEditClick={handleEditClick}
                      handleDelete={handleDelete}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      {userDetail?.role === "manager" || userDetail?.role === "owner" ? (
        <>
          <div>
            <span>Add new employee:</span>
          </div>
          <div>
            <form className="form-fillup" onSubmit={handleSubmit}>
              <div>
                {/* <InputFiled
                  name="empName"
                  type="text"
                  label="Employe Name"
                  id="empName"
                  value={formValues.empName}
                  handleChange={handleChange}
                ></InputFiled> */}
                <select
                  key={selectedOptionKey}
                  value={selectedOption}
                  // onChange={(e) => setSelectedOption(e.target.value)}
                  onChange={handleDropdownChange}
                  // onChange={(e) => formValues.empName(e.target.value)}
                >
                  {options}
                </select>
                <p>Selected option: {selectedOption}</p>
              </div>
              <div className="timeSlot">
                <div>
                  <InputFiled
                    name="mondayStart"
                    type="time"
                    label="Monday Start Time"
                    id="monday"
                    min="7:00"
                    max="20:30"
                    value={formValues.mondayStart}
                    handleChange={handleChange}
                  />
                  <InputFiled
                    name="mondayEnd"
                    type="time"
                    label="Monday End Time"
                    id="monday"
                    min="7:00"
                    max="20:30"
                    value={formValues.mondayEnd}
                    handleChange={handleChange}
                  />
                </div>
                <div>
                  <InputFiled
                    name="tuesdayStart"
                    type="time"
                    label="Tuesday Start Time"
                    id="tuesday"
                    min="7:00"
                    max="20:30"
                    value={formValues.tuesdayStart}
                    handleChange={handleChange}
                  />
                  <InputFiled
                    name="tuesdayEnd"
                    type="time"
                    label="Tuesday End Time"
                    id="tuesday"
                    min="7:00"
                    max="20:30"
                    value={formValues.tuesdayEnd}
                    handleChange={handleChange}
                  />
                </div>
                <div>
                  <InputFiled
                    name="wednesdayStart"
                    type="time"
                    label="Wednesday Start TIme"
                    id="wednesday"
                    min="7:00"
                    max="20:30"
                    value={formValues.wednesdayStart}
                    handleChange={handleChange}
                  />
                  <InputFiled
                    name="wednesdayEnd"
                    type="time"
                    label="Wednesday End Time"
                    id="wednesday"
                    min="7:00"
                    max="20:30"
                    value={formValues.wednesdayEnd}
                    handleChange={handleChange}
                  />
                </div>
                <div>
                  <InputFiled
                    name="thursdayStart"
                    type="time"
                    label="Thursday Start Time"
                    id="thursday"
                    min="7:00"
                    max="20:30"
                    value={formValues.thursdayStart}
                    handleChange={handleChange}
                  />
                  <InputFiled
                    name="thursdayEnd"
                    type="time"
                    label="Thursday End Time"
                    id="thursday"
                    min="7:00"
                    max="20:30"
                    value={formValues.thursdayEnd}
                    handleChange={handleChange}
                  />
                </div>
                <div>
                  <InputFiled
                    name="fridayStart"
                    type="time"
                    label="Friday Start Time"
                    id="friday"
                    min="7:00"
                    max="20:30"
                    value={formValues.fridayStart}
                    handleChange={handleChange}
                  />
                  <InputFiled
                    name="fridayEnd"
                    type="time"
                    label="Friday End Time"
                    id="friday"
                    min="7:00"
                    max="20:30"
                    value={formValues.fridayEnd}
                    handleChange={handleChange}
                  />
                </div>
                <div>
                  <InputFiled
                    name="saturdayStart"
                    type="time"
                    label="Saturday Start Time"
                    id="saturday"
                    min="7:00"
                    max="20:30"
                    value={formValues.saturdayStart}
                    handleChange={handleChange}
                  />
                  <InputFiled
                    name="saturdayEnd"
                    type="time"
                    label="Saturday End Time"
                    id="saturday"
                    min="7:00"
                    max="20:30"
                    value={formValues.saturdayEnd}
                    handleChange={handleChange}
                  />
                </div>
                <div>
                  <InputFiled
                    name="sundayStart"
                    type="time"
                    label="Sunday Start Time"
                    id="sunday"
                    min="7:00"
                    max="20:30"
                    value={formValues.sundayStart}
                    handleChange={handleChange}
                  />
                  <InputFiled
                    name="sundayEnd"
                    type="time"
                    label="Sunday End Time"
                    id="sunday"
                    min="7:00"
                    max="20:30"
                    value={formValues.sundayEnd}
                    handleChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Button varient="primary" type="submit">
                  Add +
                </Button>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
