import React from "react";
const EditRow = ({ editFormValues, handleEditChange, handleCancle }) => {
  console.log("****************************************");
  console.log(editFormValues);
  return (
    <tr>
      <td>
        <input
          name="name"
          type="text"
          label="Employe Name"
          id="empName"
          value={editFormValues.name}
          onChange={handleEditChange}
        ></input>
      </td>
      <td>
        <div>
          <input
            name="monday-startTime"
            type="time"
            label="Monday Start Time"
            id="monday"
            min="7:00"
            max="20:30"
            value={editFormValues.monday.startTime}
            onChange={handleEditChange}
          />
          <input
            name="monday-endTime"
            type="time"
            label="Monday End Time"
            id="monday"
            min="7:00"
            max="20:30"
            value={editFormValues.monday.endTime}
            onChange={handleEditChange}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            name="tuesday-startTime"
            type="time"
            label="Tuesday Start Time"
            id="tuesday"
            min="7:00"
            max="20:30"
            value={editFormValues.tuesday.startTime}
            onChange={handleEditChange}
          />
          <input
            name="tuesday-endTime"
            type="time"
            label="Tuesday End Time"
            id="tuesday"
            min="7:00"
            max="20:30"
            value={editFormValues.tuesday.endTime}
            onChange={handleEditChange}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            name="wednesday-startTime"
            type="time"
            label="Wednesday Start TIme"
            id="wednesday"
            min="7:00"
            max="20:30"
            value={editFormValues.wednesday.startTime}
            onChange={handleEditChange}
          />
          <input
            name="wednesday-endTime"
            type="time"
            label="Wednesday End Time"
            id="wednesday"
            min="7:00"
            max="20:30"
            value={editFormValues.wednesday.endTime}
            onChange={handleEditChange}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            name="thursday-startTime"
            type="time"
            label="Thursday Start Time"
            id="thursday"
            min="7:00"
            max="20:30"
            value={editFormValues.thursday.startTime}
            onChange={handleEditChange}
          />
          <input
            name="thursday-endTime"
            type="time"
            label="Thursday End Time"
            id="thursday"
            min="7:00"
            max="20:30"
            value={editFormValues.thursday.endTime}
            onChange={handleEditChange}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            name="friday-startTime"
            type="time"
            label="Friday Start Time"
            id="friday"
            min="7:00"
            max="20:30"
            value={editFormValues.friday.startTime}
            onChange={handleEditChange}
          />
          <input
            name="friday-endTime"
            type="time"
            label="Friday End Time"
            id="friday"
            min="7:00"
            max="20:30"
            value={editFormValues.friday.endTime}
            onChange={handleEditChange}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            name="saturday-startTime"
            type="time"
            label="Saturday Start Time"
            id="saturday"
            min="7:00"
            max="20:30"
            value={editFormValues.saturday.startTime}
            onChange={handleEditChange}
          />
          <input
            name="saturday-endTime"
            type="time"
            label="Saturday End Time"
            id="saturday"
            min="7:00"
            max="20:30"
            value={editFormValues.saturday.endTime}
            onChange={handleEditChange}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            name="sunday-startTime"
            type="time"
            label="Sunday Start Time"
            id="sunday"
            min="7:00"
            max="20:30"
            value={editFormValues.sunday.startTime}
            onChange={handleEditChange}
          />
          <input
            name="sunday-endTime"
            type="time"
            label="Sunday End Time"
            id="sunday"
            min="7:00"
            max="20:30"
            value={editFormValues.sunday.endTime}
            onChange={handleEditChange}
          />
        </div>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancle}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditRow;
