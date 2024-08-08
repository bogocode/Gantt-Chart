import express from "express";
import {
  createProject,
  defaultPage,
  createGanttChart,
  createTask,
  getAllProjectNames,
  getGantChartNames,
  getTasks,
  updateTasks,
  deleteProject,
  deleteGanttChart,
  getProjectAndSubtitles,
  getGanttChartData,
} from "../controller/controller.js";
const router = express.Router();
router.get("/", defaultPage);
router.get("/getAllProjectNames", getAllProjectNames);
router.get("/getGantChartNames", getGantChartNames);
router.get("/getTasks", getTasks);
router.get("/getProjectAndSubtitles", getProjectAndSubtitles);
router.get("/getGanttChartData", getGanttChartData);
router.post("/createProject", createProject);
router.post("/createGanttChart", createGanttChart);
router.post("/addTask", createTask);
router.put("/updateTasks", updateTasks);
router.delete("/deleteProject", deleteProject);
router.delete("/deleteGanttChart", deleteGanttChart);
export default router;
