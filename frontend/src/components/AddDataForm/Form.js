// Form.js
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAppContext, useAppContextUpdate } from "../../AppContext";
import "./FormStyle.css";
const Form = ({ handleClose }) => {
  const { tasks } = useAppContext();
  const { setTasks, setError } = useAppContextUpdate();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [owner, setOwner] = useState("");
  const [showError, setShowError] = useState(true);
  const validateData = (data) => {
    if (!data.name) return "*Please input Task Name";
    if (!data.start) return "*Please input Start date";
    if (!data.end) return "*please input end date";
    if (data.start > data.end) return "*End date must a date after start date";
    let dataExists = false;
    tasks.map((task) => {
      if (task.name === data.name) dataExists = true;
    });
    if (dataExists) return `${data.name} already exists`;
    return null;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const data = {
      name: name,
      start: new Date(Date.parse(startDate)),
      end: new Date(Date.parse(endDate)),
    };

    const validate = validateData(data);
    if (validate) {
      setErrorMessage(validate);
      setShowError(true);
      return;
    }
    const taskEvent = {
      start: data.start,
      end: data.end,
      name: data.name,
      id: data.name,
      type: "task",
    };
    console.log([taskEvent, ...tasks]);
    setTasks([taskEvent, ...tasks]);
    // Send data to backend here and then establish the new gantt chart
    handleClose();
  };

  return (
    <div className="popup">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Task</h1>
        <div className="close">
          <IoMdClose
            size={"2rem"}
            onClick={() => {
              handleClose();
            }}
          />
        </div>
        <div className="inputs">
          <input
            onChange={(event) => {
              setShowError(false);
              setName(event.target.value);
            }}
            value={name}
            placeholder="Task Name"
          />
          <div>
            <label>
              Start Date :{" "}
              <input
                type="date"
                value={startDate}
                placeholder="Start Date"
                onChange={(event) => {
                  setShowError(false);
                  setStartDate(event.target.value);
                }}
              />
            </label>
            <label>
              End Date :{" "}
              <input
                type="date"
                value={endDate}
                onChange={(event) => {
                  setShowError(false);
                  setEndDate(event.target.value);
                }}
                placeholder="End Date"
              />
            </label>
          </div>
          <input
            type="email"
            value={owner}
            placeholder={"Owner Email"}
            onChange={(event) => {
              setOwner(event.target.value);
            }}
          />
        </div>
        <button className="submit" type="submit">
          Add
        </button>
        {showError && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Form;
