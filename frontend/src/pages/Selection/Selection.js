import { useEffect } from "react";
import { useAppContext, useAppContextUpdate } from "../../AppContext";
import "./selectionPage.css";
import { useNavigate } from "react-router-dom";
const Selection = () => {
  const { tasks, projectData } = useAppContext();
  const { fetchTasks } = useAppContextUpdate();
  const navigate = useNavigate();
  const handleClick = (title, subtitle) => {
    fetchTasks(title, subtitle);
    // navigate("/ganttchart");
    console.log(tasks);
  };
  return (
    <div className="body">
      <div className="list">
        {projectData &&
          projectData.map((project) => {
            return (
              <div className="list-item">
                <h1>{project[0]}</h1>
                {
                  <ul>
                    {project[1] &&
                      project[1].map((subtitle, key) => (
                        <li
                          onClick={() => {
                            handleClick(project[0], subtitle);
                          }}
                        >
                          {subtitle}
                        </li>
                      ))}
                  </ul>
                }
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Selection;
