import mongoose from "mongoose";

// Define ownerSchema first since it's referenced in other schemas
const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// Define taskSchema
const taskSchema = new mongoose.Schema({
  ganttChart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GanttChartData",
    required: true,
  },
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  owner: { type: String, required: true },
  id: { type: String, required: true },
});
// Define commentSchema
const commentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  message: { type: String },
});

// Define ganttChartData schema
const ganttChartDataSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  }, // Assuming project name is a string
  name: { type: String, required: true },
  tasks: [taskSchema],
  comments: [commentSchema],
});

// Define projectSchema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teamName: { type: String, required: true },
  subtitles: [ganttChartDataSchema],
});

// Export schemas as models
const Owner = mongoose.model("Owner", ownerSchema);
const Task = mongoose.model("Task", taskSchema);
const Comment = mongoose.model("Comment", commentSchema);
const GanttChartData = mongoose.model("GanttChartData", ganttChartDataSchema);
const Project = mongoose.model("Project", projectSchema);

export { Owner, Task, Comment, GanttChartData, Project };
