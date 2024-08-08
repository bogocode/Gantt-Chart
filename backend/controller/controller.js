import {
  Owner,
  Task,
  Comment,
  GanttChartData,
  Project,
} from "../models/models.js";

// Default route handler for non-existent routes
const defaultPage = async (req, res) => {
  res.status(404).send({
    message: "Page not found",
  });
};

// Route handler for creating a new project
const createProject = async (req, res) => {
  try {
    const { name, teamName } = req.body;
    console.log(`name = ${name} and team name = ${teamName}`);

    // Validate request data
    if (!name || !teamName) {
      return res.status(400).send({
        message: "Incomplete data: Project name and team name are required.",
      });
    }

    // Create a new project
    const subtitles = [];
    const newProject = new Project({
      name,
      teamName,
      subtitles,
    });
    const findProject = await Project.findOne({ name: newProject.name });
    console.log(findProject);
    if (findProject) throw new Error("Project Already Exists");
    console.log("Project creation initiated");
    await newProject.save();
    res.status(201).send({
      message: "Project successfully created",
      newProject,
    });
  } catch (err) {
    console.error("Error creating project:", err);

    res.status(500).send({
      message: "An error occurred while creating the project.",
      error: err.message,
    });
  }
};
const getProjectAndSubtitles = async (req, res) => {
  try {
    const projects = await Project.find({});
    const mapOfInfo = new Map();
    projects.map((project) => {
      mapOfInfo.set(
        project.name,
        project.subtitles.map((subtitle) => subtitle.name)
      );
    });
    const listOfInfo = Array.from(mapOfInfo.entries());
    res.status(200).send({
      message: "success",
      listOfInfo,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const createGanttChart = async (req, res) => {
  try {
    const { projectName, name } = req.body;
    const project = await Project.findOne({ name: projectName });
    const ganttChart = await GanttChartData.findOne({
      project: project,
      name: name,
    });
    if (!project || ganttChart) throw new Error("Not Found");

    const newGanttChart = new GanttChartData({
      project: project,
      name: name,
      tasks: [],
      comments: [],
    });
    project.subtitles.push(newGanttChart);
    await project.save();
    await newGanttChart.save();
    res.status(200).send({
      message: "gant chart created",
    });
    console.log(project);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const createTask = async (req, res) => {
  try {
    const { projectName, ganttChartName, name, start, end, ownerEmail } =
      req.body;
    const project = await Project.findOne({
      name: projectName,
    });
    const ganttChart = await GanttChartData.findOne({
      project: project,
      name: ganttChartName,
    });
    if (!project || !ganttChart) throw new Error("Not Found");
    const duplicateTask = await Task.findOne({
      ganttChart: ganttChart,
      name: name,
    });
    if (duplicateTask) throw new Error("Duplicate Task");
    const task = new Task({
      ganttChart: ganttChart,
      name: name,
      start: start,
      end: end,
      owner: ownerEmail,
      id: name,
    });

    ganttChart.tasks.push(task);
    await ganttChart.save();
    await task.save();
    res.status(201).send({
      message: "Sucess",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getGantChartNames = async (req, res) => {
  try {
    const { projectName } = req.body;
    const project = await Project.findOne({
      name: projectName,
    });
    if (!project) throw new Error("Project not Found");
    const subtitles = project.subtitles;
    console.log(subtitles);
    res.status(200).send({
      message: "Sucessfull",
      subtitles,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getGanttChartData = async (req, res) => {
  try {
    const { projectName, ganttChartName } = req.body;

    const project = await Project.findOne({ name: projectName });
    if (!project) throw new Error(`${projectName} Not Found`);
    const ganttChart = await GanttChartData.findOne({ name: ganttChartName });
    if (!ganttChart) throw new Error(`${ganttChartName} not found`);
    res.status(200).send({
      message: "Sucessfull",
      tasks: ganttChart.tasks,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getAllProjectNames = async (req, res) => {
  try {
    const Projects = await Project.find({});
    res.status(200).send({
      message: "Sucessfull",
      Projects,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getTasks = async (req, res) => {
  try {
    const { projectName, ganttChartName } = req.query;
    const project = await Project.findOne({ name: projectName });
    const ganttchart = await GanttChartData.findOne({
      project: project,
      name: ganttChartName,
    });
    if (!project || !ganttchart) throw new Error("not found");
    const tasks = ganttchart.tasks;
    res.status(200).send({
      message: "Sucessfull",
      tasks,
    });
    console.log(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};
const updateTasks = async (req, res) => {
  try {
    const { projectName, ganttChartName, tasks } = req.body;
    const project = await Project.findOne({ name: projectName });
    const ganttChart = await GanttChartData.findOne({
      project: project,
      name: ganttChartName,
    });
    if (!project || !ganttChart) throw new Error("Not Found");
    ganttChart.tasks = tasks;
    await ganttChart.save();
    res.status(201).send({
      message: "sucesss",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.findOne({ name: name });
    if (!project) throw new Error(`Project ${name} not found`);
    const deleted = await Project.deleteOne(project);
    res.status(200).send({
      message: "successful",
      deleted,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const deleteGanttChart = async (req, res) => {
  try {
    const { name, ganttChartName } = req.body;
    const project = await Project.findOne({ name: name });
    if (!project) throw new Error(`Project ${name} not found`);
    const ganttChart = await GanttChartData.findOne({
      project,
      name: ganttChartName,
    });
    if (!ganttChart) throw new Error(`${ganttChartName} Not Found`);
    const deleted = await GanttChartData.deleteOne(ganttChart);
    res.status(200).send({
      message: "successful",
      deleted,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
export {
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
};
