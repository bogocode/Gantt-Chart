import React from "react";
import { ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import "./style.css";
const ViewSwitcher = ({ onViewModeChange, onViewListChange, isChecked }) => {
  return (
    <div className="container">
      <div className="buttons">
        <button
          className="Button"
          onClick={() => {
            onViewModeChange(ViewMode.Hour);
          }}
        >
          Hour
        </button>
        <button
          className="Button"
          onClick={() => onViewModeChange(ViewMode.QuarterDay)}
        >
          Quarter of Day
        </button>
        <button
          className="Button"
          onClick={() => onViewModeChange(ViewMode.HalfDay)}
        >
          Half of Day
        </button>
        <button
          className="Button"
          onClick={() => onViewModeChange(ViewMode.Day)}
        >
          Day
        </button>
        <button
          className="Button"
          onClick={() => onViewModeChange(ViewMode.Week)}
        >
          Week
        </button>
        <button
          className="Button"
          onClick={() => onViewModeChange(ViewMode.Month)}
        >
          Month
        </button>
        <button
          className="Button"
          onClick={() => onViewModeChange(ViewMode.Year)}
        >
          Year
        </button>
      </div>
      <div className="slider-container">
        <label className="slider-label">
          <input
            className="slider-checkbox"
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="slider" />
        </label>
        Show Task List
      </div>
    </div>
  );
};
export default ViewSwitcher;
