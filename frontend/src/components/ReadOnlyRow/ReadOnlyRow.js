import React from "react";
import IconComponent from "../Icon/Icon";
import "./ReadOnlyRow.styles.css";
const ReadOnlyRow = ({
  user,
  handleEditClick,
  handleDelete,
  userName,
  profilePic,
}) => {
  const image = profilePic;
  console.log(profilePic);
  return (
    <tr>
      <td className="td-data">
        <img src={image} className="profile-pic" />
        {userName}
      </td>
      <td className="td-data">
        {user.monday.startTime}
        {user.monday.startTimeAbbreviations} - {user.monday.endTime}
        {user.monday.endTimeAbbreviations}
      </td>
      <td className="td-data">
        {user.tuesday.startTime}
        {user.tuesday.startTimeAbbreviations} - {user.tuesday.endTime}
        {user.tuesday.endTimeAbbreviations}
      </td>
      <td className="td-data">
        {user.wednesday.startTime}
        {user.wednesday.startTimeAbbreviations} - {user.wednesday.endTime}
        {user.wednesday.endTimeAbbreviations}
      </td>
      <td className="td-data">
        {user.thursday.startTime}
        {user.thursday.startTimeAbbreviations} - {user.thursday.endTime}
        {user.thursday.endTimeAbbreviations}
      </td>
      <td className="td-data">
        {user.friday.startTime}
        {user.friday.startTimeAbbreviations} - {user.friday.endTime}
        {user.friday.endTimeAbbreviations}
      </td>
      <td className="td-data">
        {user.saturday.startTime}
        {user.saturday.startTimeAbbreviations} - {user.saturday.endTime}
        {user.saturday.endTimeAbbreviations}
      </td>
      <td className="td-data">
        {user.sunday.startTime}
        {user.sunday.startTimeAbbreviations} - {user.sunday.endTime}
        {user.sunday.endTimeAbbreviations}
      </td>
      <td className="td-data">
        <IconComponent name="edit" onClick={(e) => handleEditClick(e, user)} />
        <IconComponent
          name="delete"
          onClick={() => handleDelete(user.user_id)}
        />
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
