import React, { useState, useContext, useEffect } from "react";
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import ViewSwitcher from "../components/TaskBar/ViewSwitcher";
import Form from "../components/AddDataForm/Form";
import { useAppContext, useAppContextUpdate } from "../AppContext";
import {
  CiCirclePlus,
  CiCircleMinus,
  CiCircleChevDown,
  CiCircleChevUp,
} from "react-icons/ci";
import "./style.css";

const Home = () => {
  const { tasks, isLoading, error } = useAppContext();
  const { setTasks, setError } = useAppContextUpdate();
  const [view, setView] = useState(ViewMode.Day);
  const [isChecked, setIsChecked] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const handleTaskChange = (taskChange) => {
    console.log(taskChange);
    const updatedList = tasks.map((task) => {
      if (task.id === taskChange.id) {
        task.start = taskChange.start;
        task.end = taskChange.end;
      }
      return task;
    });
    setTasks(updatedList);
    // make update in the backend, here only the date is changing
  };
  const handleClick = (task) => {
    if (deleteTask) {
      console.log(task.name);

      const updatedTaskList = tasks.filter((current_task) => {
        if (current_task.name !== task.name) return current_task;
      });
      console.log(updatedTaskList);
      setTasks(updatedTaskList);
      if (updatedTaskList.length === 0) setError("Empty Task List");
    }
  };

  const handleInput = (input) => {
    // handle add/delete tasks - true for add and false for delete
    if (input) {
      // add task

      setPopupOpen(true);
    } else {
    }
  };
  useEffect(() => {
    console.log(tasks);
  });
  return (
    <div className="body">
      {!dropdown ? (
        <CiCircleChevDown
          className="menu-icon"
          color={"white"}
          size={"32px"}
          onClick={() => {
            setDropDown(!dropdown);
          }}
        />
      ) : (
        <div className="menu">
          <CiCircleChevUp
            color={"white"}
            size={"32px"}
            onClick={() => {
              setDropDown(!dropdown);
            }}
          />
          {isPopupOpen && (
            <Form
              handleClose={() => {
                setPopupOpen(false);
              }}
              tasks={tasks}
              setTaskList={setTasks}
            />
          )}
          <div className="view-switcher">
            <ViewSwitcher
              onViewListChange={setIsChecked}
              onViewModeChange={(view) => {
                setView(view);
              }}
              isChecked={isChecked}
            />
          </div>
        </div>
      )}
      <div className="gantt-chart">
        <div className="controls">
          <CiCirclePlus
            className="control-button"
            size={"3rem "}
            onClick={() => {
              handleInput(true);
            }}
          />
          <div
            className={`control-button ${deleteTask ? "active" : "inactive"}`}
            onClick={() => {
              setDeleteTask(!deleteTask);
            }}
          >
            <CiCircleMinus size={"2rem"} />
          </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p> {error}</p>
        ) : (
          tasks &&
          tasks.map((task) => {
            return task.name;
          })
          // <Gantt
          //   tasks={tasks}
          //   viewMode={view}
          //   onDateChange={handleTaskChange}
          //   // onProgressChange={handleProgressChange}
          //   // onDoubleClick={handleDblClick}
          //   onClick={handleClick}
          //   // onSelect={handleSelect}
          //   onExpanderClick={() => {}}
          //   listCellWidth={isChecked ? "155px" : ""}
          //   // columnWidth={columnWidth}
          // />
        )}
      </div>
    </div>
  );
};

export default Home;
