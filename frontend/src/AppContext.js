import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
export const Context = React.createContext();
export const UpdateContext = React.createContext();
export const useAppContext = () => {
  return useContext(Context);
};
const BASE_URL = "http://localhost:4000/";
export const useAppContextUpdate = () => {
  return useContext(UpdateContext);
};
export const ContextProvider = ({ children }) => {
  const [projectData, setProjectData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formatTasks = (listOfTasks) => {
    listOfTasks.map((task) => {
      task.start = new Date(task.start);
      task.end = new Date(task.end);
    });
    setTasks(listOfTasks);
  };
  const fetchTasks = async (projectName, ganttChartName) => {
    try {
      setLoading(true);
      const endpoint = "getTasks";
      const input = {
        projectName,
        ganttChartName,
      };
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: input,
      });

      const tasks = response.data.tasks;

      formatTasks(tasks);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchProjectData = async () => {
    try {
      const endpoint = "getProjectAndSubtitles";
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      const data = response.data;
      setProjectData(data.listOfInfo);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);
  return (
    <Context.Provider value={{ tasks, isLoading, error, projectData }}>
      <UpdateContext.Provider
        value={{ setTasks, setError, fetchProjectData, fetchTasks }}
      >
        {children}
      </UpdateContext.Provider>
    </Context.Provider>
  );
};
